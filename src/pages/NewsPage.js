import React, { Component } from 'react';
import {Animated, Easing, RefreshControl, ScrollView, StyleSheet, View, Dimensions, Text, Platform} from 'react-native';
import NewsItem from '../components/NewsItem';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const screenWidth = Dimensions.get('window').width;

export default class NewsPage extends Component {
  constructor(props){
    super(props);
    this.opacityValue = new Animated.Value(0);
    this.state = {
      is_news_refreshing: false,
      news_items: [
        {
          title: 'CTO Mentor Network – a virtual peer-to-peer network of CTOs',
          website: 'ctomentor.network',
          url: 'https://ctomentor.network/'
        },
        {
          title: 'The No More Ransom Project',
          website: 'nomoreransom.org',
          url: 'https://www.nomoreransom.org/'
        },
        {
          title: 'NASA Scientists Suggest We’ve Been Underestimating Sea Level Rise',
          website: 'vice.com',
          url: 'http://motherboard.vice.com/read/nasa-scientists-suggest-weve-been-underestimating-sea-level-rise'
        },
        {
          title: 'Buttery Smooth Emacs',
          website: 'facebook.com',
          url: 'https://www.facebook.com/notes/daniel-colascione/buttery-smooth-emacs/10155313440066102/'
        },
        {
          title: 'Elementary OS',
          website: 'taoofmac.com',
          url: 'http://taoofmac.com/space/blog/2016/10/29/2240'
        },
        {
          title: 'The Strange Inevitability of Evolution',
          website: 'nautil.us',
          url: 'http://nautil.us/issue/41/selection/the-strange-inevitability-of-evolution-rp'
        },
      ],
      carouselItems: [
        {
          title:"Item 1"
        },
        {
          title:"Item 2"
        },
        {
          title:"Item 3"
        },
        {
          title:"Item 4"
        },
        {
          title:"Item 5"
        }
      ]
    }
  }

  opacityTime = 3500;

  opacity = () => {
    this.opacityValue.setValue(0);
    Animated.timing(
      this.opacityValue,
      {
        toValue: 1,
        duration: this.opacityTime,
        delay: 500, //additional
        easing: Easing.linear //additional
      }
    ).start();
  };

  refreshNews = () => {
    this.opacity();
    this.setState({is_news_refreshing: true});
    setTimeout(() => {
      this.setState({is_news_refreshing: false});
    }, this.opacityTime);
  };

  renderNewsItems() {
    return this.state.news_items.map((news, index) => {
      return (
        <NewsItem key={index} index={index} news={news} />
      );
    });
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={s.item}>
        <ParallaxImage
          source={{ uri: 'https://mdbootstrap.com/img/Photos/Slides/img%20(45).jpg' }}
          containerStyle={s.imageContainer}
          style={s.image}
          parallaxFactor={0.4}
        />
        <Text style={s.title} numberOfLines={2}>
          qq
        </Text>
      </View>
    );
  };

  render() {
    const opacity = this.opacityValue.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [1, 0, 1]
    });

    return (
      <View style={s.container}>
        <View style={s.header}>
        </View>
        <View style={s.carouselContainer}>
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            itemHeight={60}
            data={this.state.carouselItems}
            renderItem={this._renderItem}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={['#1e90ff']}
              refreshing={this.state.is_news_refreshing}
              onRefresh={this.refreshNews}
            />
          }
          style={s.news_container}>
          <Animated.View style={[{opacity}]}>
            {this.renderNewsItems()}
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'space-between',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1
  },
  news_container: {
    flex: 1,
  },
  carouselContainer: {
    backgroundColor: '#c737c7'
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  }
});