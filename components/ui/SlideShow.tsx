import { SlidesOfCarousel } from "@/constants/SlideLinks";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
const width = Dimensions.get("window").width;
export type SlideType = {
  id?: string;
  imagePath?: string;
};

type SlideProps = {
  item: SlideType[];
  time?: number;
};
export const SlideShow = ({ item, time }: SlideProps) => {
  const carouselRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = item.length > 0 ? item : SlidesOfCarousel;
  const timeInterval = time ? time : 5000; // Default to 5 seconds if no time is provided

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        let nextIndex = (currentIndex + 1) % slides.length;
        carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, timeInterval);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={carouselRef}
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.image}
            />
          </View>
        )}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? "blue" : "gray" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: { width: width, alignItems: "center" },
  image: { width: "90%", height: 200, borderRadius: 10 },
  dotContainer: {
    position: "absolute",
    bottom: 10,

    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 },
});
