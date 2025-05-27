import { SlidesOfCarousel } from "@/constants/SlideLinks";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
const width = Dimensions.get("window").width;
export type SlideType = {
  id?: string;
  imgPath?: string;
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
        renderItem={({ item }) => {
          return (
            <View style={styles.slide}>
              {item.imgPath ? (
                <Image
                  source={{ uri: item.imgPath }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Image source={item.image} style={styles.image} />
              )}
            </View>
          );
        }}
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
    width: "100%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: { width: width, alignItems: "center", justifyContent: "center" },
  image: { width: "98%", height: 200, borderRadius: 10 },
  dotContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 },
});
