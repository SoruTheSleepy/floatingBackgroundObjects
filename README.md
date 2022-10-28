# Floating Background Object

floatingBackgroundObjects.js is script allowing you to simply add one or more images floating from left to right or right to left in the background of any div, section, etc. from your page.

You can use it on any HTML element you want by either referring to its ID, its/their class or simply by its/their tag.
You can also use it with any image you want. Images with transparent background are, however, recommended for a smoother result.

This is a remastered version of my very first shared JS script so I hope it'll be helpful and/or amusing to use. ^^
As it's my first shared work, I'd be really grateful if you could tell me what you think can be improved. :)

You can check out an example of use [here](https://naorimsenchai.github.io/floatingBackgroundObjects/).

## How to use

After downloading the script, put it in your project's directory and import it in you html page.
```html
<body>
  <section id="s1">
    <h1>Hello!</h1>
  </section>
</body>
<script src="/js/floatingBackgroundObjects.js">
</html>
```

Simply type <b>addFloatingBackgroundObjects(\<your html tag\>, \<your image path\>)</b> and poof! Animated background!
```html
<body>
  <section id="s1">
    <h1>Hello!</h1>
  </section>
</body>
<script src="/js/floatingBackgroundObjects.js">
<script>
  floatingBackgroundObjects("#s1", 'path/to/image.png');
</script>
</html>
```
  
A third argument, an object, allows you to customize your floating items' behavior.
I recommend downloading the demon version below to get hints about it.

The script comes with some JSDoc in order to complete its accessibility.

## Download

You can download the script by clicking [here](https://raw.githubusercontent.com/NaorimSenchai/floatingBackgroundObjects/master/js/floatingBackgroundObjects.js).
Or download the [demo project](https://github.com//NaorimSenchai/floatingBackgroundObjects/archive/refs/heads/master.zip).
