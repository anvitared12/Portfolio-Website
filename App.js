import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, useWindowDimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const slides = [
  {
    id: 1,
    title: 'Anvita S Reddy',
    subtitle: 'Student at Medhavi Skills University',
    content: 'Searching for knowledge and innovation.\nI am a second-year student passionate about technology, data analysis and machine learning.',
    tags: ['Student', 'Developer', 'Analyst']
  },
  {
    id: 2,
    title: 'Languages',
    subtitle: '',
    list: ['Python', 'Java', 'Javascript', 'Kotlin', 'Learning Julia']
  },
  {
    id: 3,
    title: 'Data Analysis',
    subtitle: 'Turning Data into Insights',
    content: 'Proficient in Python and its powerful libraries.',
    list: ['Numpy', 'Pandas', 'Seaborn', 'Matplotlib', 'Scikit-learn', 'SQL']
  },
  {
    id: 4,
    title: 'Development Skills',
    subtitle: 'Building the Future',
    content: 'Specialized in Mobile and Web Applications.',
    list: ['Android Developer (Kotlin)', 'React & React Native Developer', 'Data Structures & Algorithms (Java)']
  }
];

export default function App() {
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Background animation loop
  const bgAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bgInterpolation = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1a0b2e', '#4e1b4bff'] // Deep purple/cosmic theme
  });

  const handlePress = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }

    Animated.timing(slideAnim, {
      toValue: nextIndex,
      duration: 800, // Slower duration for smoother transition
      useNativeDriver: true,
    }).start();
    
    setCurrentIndex(nextIndex);
  };

  const translateX = slideAnim.interpolate({
    inputRange: slides.map((_, i) => i),
    outputRange: slides.map((_, i) => -i * width)
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.container, { backgroundColor: bgInterpolation }]}>
        <StatusBar style="light" />
        
        {/* Decorative Circles */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        
        <Animated.View 
          style={[
            styles.slidesContainer, 
            { 
              width: width * slides.length, 
              transform: [{ translateX }]
            }
          ]}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={[styles.slide, { width, height }]}>
              <View style={styles.card}>
                <Text style={styles.title}>{slide.title}</Text>
                {slide.subtitle && <Text style={styles.subtitle}>{slide.subtitle}</Text>}
                
                {slide.content && (
                  <Text style={styles.content}>{slide.content}</Text>
                )}

                {slide.list && (
                  <View style={styles.listContainer}>
                    {slide.list.map((item, idx) => (
                      <View key={idx} style={styles.chip}>
                        <Text style={styles.chipText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
                
                {/* Tags removed as requested */}
              </View>
              
              <Text style={styles.tapHint}>Tap to continue</Text>
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  slidesContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(52, 0, 74, 0.83)', // Increased translucency
    backdropFilter: 'blur(10px)', // Works on web
    padding: 30,
    borderRadius: 25,
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#a5b4fc',
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 24,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  tag: {
      color: '#cbd5e1',
      fontStyle: 'italic',
  },
  tapHint: {
    position: 'absolute',
    bottom: 40,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.4,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: '#7c3aed',
    top: -50,
    left: -50,
    filter: 'blur(30px)', // Web specific
  },
  circle2: {
    width: 400,
    height: 400,
    backgroundColor: '#ec4899',
    bottom: -100,
    right: -100,
    filter: 'blur(40px)', // Web specific
  }
});
