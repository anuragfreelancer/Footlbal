
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Getplayer, GetReviewsByCoachIdApi } from '../../../../redux/Api/AuthApi';
import { base_url } from '../../../SubscriptionPlans/SubscriptionPlansScreen';
const useAllPlayer = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false)
  const isLogin = useSelector((state: any) => state?.auth);
  const [allPlay, setAllPlay] = useState<any>([]);
  const [searchPlaylist, setSearchPlaylist] = useState<string>("");
  const [filterData, setFilterData] = useState<any>("");
  const [viewType, setViewType] = useState<"Players" | "Rate">("Players");
  const [reviews, setReviews] = useState<any[]>([]);
  useFocusEffect(
    useCallback(() => {
      getCoachSession();
    }, [])
  );
  const getCoachSession = async () => {
    try {
      const response = await fetch(
        `${base_url}${'get_coach_session'}?user_id=${isLogin?.userData?.id}`
      );

      const json = await response.json();
      console.log('API Response:', json);
      setAllPlay(json.result);
      setFilterData(json.result)
    } catch (error) {
      console.log('API Error:', error);
    } finally {

    }
  };
  const GetplayerApi = async () => {
    try {
      const state = await Getplayer(isLogin?.userData?.id, setisLoading);
      if (state) {
        console.log("state?.userGetData", state?.userGetData)


      }
    } catch (error) {
    }
  };

  const fetchReviewsApi = async () => {
    try {
      const data = await GetReviewsByCoachIdApi(isLogin?.userData?.id, setisLoading);
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("fetchReviewsApi error:", error);
    }
  };

  useEffect(() => {
    if (viewType === "Rate") {
      fetchReviewsApi();
    }
  }, [viewType]);
  useEffect(() => {
    if (searchPlaylist?.trim() === '') {
      setFilterData(allPlay);
    } else {
      const searchTerm = searchPlaylist.toLowerCase();
      const filtered = allPlay?.filter((item: any) => {
        const userName = item?.user_details?.user_name?.toLowerCase() || '';
        const email = item?.user_details?.email?.toLowerCase() || '';
        
        // Check if any player in the question details matches
        const hasMatchingPlayerInQuestions = item?.question_details?.some((q: any) => 
          q.answers?.some((ans: any) => 
            ans.user_name?.toLowerCase().includes(searchTerm)
          )
        );

        return userName.includes(searchTerm) || email.includes(searchTerm) || hasMatchingPlayerInQuestions;
      });
      setFilterData(filtered);
    }
  }, [searchPlaylist, allPlay]);


  return {
    allPlay, setAllPlay,
    isLoading, setisLoading,
    navigation,
    isLogin,
    searchPlaylist, setSearchPlaylist,
    filterData, setFilterData,
    viewType, setViewType,
    reviews, setReviews,
    fetchReviewsApi
  };
};

export default useAllPlayer;
