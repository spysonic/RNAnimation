// Animated exports the following animatable components using the above wrapper:
//
// Animated.Image
// Animated.ScrollView
// Animated.Text
// Animated.View

//create
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

//--METHODS--

//Composing animations
//Animated.delay() / Animated.parallel() / Animated.sequence() / Animated.stagger()

//DELAY - starts an animation after a given delay

this._animatedValue = new Animated.Value(0);

Animated.timing(this._animatedValue, {
  toValue: 100,
  delay: 300,
  duration: 500
}).start();

// ^
// |
// 2 equivalent animations
// |


this._animatedValue = new Animated.Value(0);

Animated.sequence([
  Animated.delay(300),
  Animated.timing(this._animatedValue, {
    toValue: 100,
    duration: 500
  })
]).start();

//DELAY

//PARALLEL - animations/array trigger at the same time

this._opacityAnimationValue = new Animated.Value(1);
this._moveAnimationValue = new Animated.ValueXY();


Animated.parallel([
  Animated.timing(this._moveAnimationValue, {
    toValue: 100,
    duration: 500
  }),
  Animated.timing(this._opacityAnimationValue, {
    toValue: 0,
    duration: 200
  })
]).start()

<Animated.View style={{opacity: this._opacityAnimationValue, transform: this._moveAnimationValue.getTranslateTransform()}} />

//PARALLEL

//SEQUENCE - animation trigger one after the other

this._opacityAnimationValue = new Animated.Value(1);
this._moveAnimationValue = new Animated.ValueXY();


Animated.sequence([
  Animated.timing(this._moveAnimationValue, {
    toValue: 100,
    duration: 500
  }),
  Animated.timing(this._opacityAnimationValue, {
    toValue: 0,
    duration: 200
  })
]).start()

<Animated.View style={{opacity: this._opacityAnimationValue, transform: this._moveAnimationValue.getTranslateTransform()}} />

//SEQUENCE - starts animations in order and in parallel, but with successive delays

this._opacityAnimationValue = new Animated.Value(1);
this._moveAnimationValue = new Animated.ValueXY();

//1st arg time
Animated.stagger(100, [
  Animated.timing(this._moveAnimationValue, {
    toValue: 100,
    duration: 500
  }),
  Animated.timing(this._opacityAnimationValue, {
    toValue: 0,
    duration: 200
  })
]).start()

<Animated.View style={{opacity: this._opacityAnimationValue, transform: this._moveAnimationValue.getTranslateTransform()}} />

//Animated.View will move, wait 100 milliseconds and then fade out

//SEQUENCE

//Combining animated


//INTERPOLATION is KEY to having great animations
//as a user scrolls or drags a card around you can interpolate from
//that Animated.Value and change things like the background color and or rotation

this._opacityAnimation = this._animatedValue.x.interpolate({
  inputRange: [0, 150],
  outputRange: [1, .2],
  extrapolate: 'clamp'
});

type ExtrapolateType = 'extend' | 'identity' | 'clamp';
//'extend' default

extrapolate?: ExtrapolateType;
extrapolateLeft?: ExtrapolateType;
extrapolateRight?: ExtrapolateType;

this._animatedValue = new Animated.Value(0);

//have extrapolation from left to right

const scaleAndFlipOnReverse = this._animatedValue.y.interpolate({
  inputRange: [0, deviceHeight],
  outputRange: [.1, 2],
  extrapolateLeft: 'extend',
  extrapolateRight: 'clamp' //for stop on 2
});

//This will cause it to flip! This is showing that when we hit our top
// level (moving to the right) it will clamp and then moving downwards
// (towars the left) it will just extend and grow.

<Animated.View style={{transform: [{scale: scaleAndFlipOnReverse}]}} />

//EVENT helper function (for scrollview and panresponder)

const interpolatedColor = this._animatedValue.interpolate({
  inputRange: [0, 5000],
  outputRange: ['rgba(255,255,255,1)', 'rgba(51,156,177, 1)'],
  extrapolate: 'clamp'
});

const event = Animated.event([
  {
    nativeEvent: {
      contentOffset: {
        y: this._animatedValue
      }
    }
  }
])

return (
  <View style={styles.container}>
    <ScrollView style={{flex: 1}} onScroll={event} scrollEventThrottle={16}>
      <Animated.View style={{height: 5000, backgroundColor: interpolatedColor}} />
    </ScrollView>
  </View>
);

//LOOP
Animated.loop(Animated.timing(this.spinAnimation, {
  toValue: 1,
  duration: 1400,
  easing: Easing.linear
})).start()

this.spin = this.spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  <Animated.View style={[styles.spinner, { transform: [{ rotate: this.spin }]} ]} />

//listeners

this._animatedValue = new Animated.Value(0);

const animatedListenerId = this._animatedValue.addListener(({value}) => this._value = value);

this._animatedValue.removeListener(animatedListenerId);
componentWillUnmount: function() {
  this._animatedValue.removeAllListeners()
}

//STOP ANIM

this._animatedValue = new Animated.Value(0);

Animated.timing(this._animatedValue, {
  toValue: 100,
  duration: 500
}).start();


setTimeout(() => this._animatedValue.stopAnimation(({value}) => console.log("Final Value: " + value)), 250);