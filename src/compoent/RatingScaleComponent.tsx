import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface RatingScaleComponentProps {
  scaleConfig: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  value?: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
}

const RatingScaleComponent: React.FC<RatingScaleComponentProps> = ({
  scaleConfig,
  value,
  onValueChange,
  disabled = false,
}) => {
  const { min, max, minLabel, maxLabel } = scaleConfig;
  const [selectedValue, setSelectedValue] = useState<number | undefined>(value);

  const handleSelect = (val: number) => {
    if (disabled) return;
    setSelectedValue(val);
    onValueChange(val);
  };

  // Generate scale values
  const scaleValues: number[] = [];
  for (let i = min; i <= max; i++) {
    scaleValues.push(i);
  }

  // Color gradient from green to orange to red
  const getColorForValue = (val: number): string => {
    const percentage = (val - min) / (max - min);
    if (percentage <= 0.33) {
      return '#4CAF50'; // Green
    } else if (percentage <= 0.66) {
      return '#FF9800'; // Orange
    } else {
      return '#F44336'; // Red
    }
  };

  return (
    <View style={styles.container}>
      {/* Scale buttons */}
      <View style={styles.scaleContainer}>
        {scaleValues.map((val) => {
          const isSelected = selectedValue === val;
          const color = getColorForValue(val);
          
          return (
            <TouchableOpacity
              key={val}
              style={[
                styles.scaleButton,
                isSelected && { backgroundColor: color, borderColor: color },
                disabled && styles.disabledButton,
              ]}
              onPress={() => handleSelect(val)}
              disabled={disabled}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.scaleText,
                  isSelected && styles.selectedScaleText,
                ]}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Labels */}
      <View style={styles.labelsContainer}>
        <Text style={styles.minLabel}>{minLabel}</Text>
        <Text style={styles.maxLabel}>{maxLabel}</Text>
      </View>

      {/* Selected value indicator */}
      {selectedValue !== undefined && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedText}>
            Selected: {selectedValue}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scaleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scaleButton: {
    width: (width - 80) / 6, // Fit 6 buttons per row with padding
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.5,
  },
  scaleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedScaleText: {
    color: '#FFFFFF',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  minLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  maxLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
    flex: 1,
  },
  selectedIndicator: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
    textAlign: 'center',
  },
});

export default RatingScaleComponent;
