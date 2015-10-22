# about-react-redux-start-kit
a start kit for creat an application with react and redux


## 使用

```bash
$ git clone https://github.com/billyct/about-react-redux-start-kit.git dest_dir
$ cd dest_dir
$ npm install
$ gulp
```

打开 [http://localhost:3000](http://localhost:3000)


## 一些东西

* gulpfile是es6的写法的
* webpack.config.js 还是原来node的写法
* 在gulp task 里面监听了 /assets 目录下的fonts和images只是复制到/dist下，而svgs是将里面所有的svg都合成一个，然后放到/dist/icons里面，然后这个目录是跟Icon这个component相关的，地址的改变需要你即改变gulp task里面的路径和在/src/constans/index.js里面的SVG_URL地址
* 关于constans里面的COMMON_STYLE_CLASS变量，是一个css class的前缀，可以根据开发的app的名字来改变
* 如果想开启redux-devtool，那么就去src/index.js里面将一些注释掉的打开，该移动的移动，参考[redux-devtool](https://github.com/gaearon/redux-devtools)的写法
* 关于store，并没有重新定义一个文件，而是直接写在了index.js里面，这样是为了更简明的结构目录
* 关于使用webstorm开发的话，请打开jsx-harmony来使用，还有吧code quality调到eslint
* 关于webpack-dev-server用了react的热插的东西[react-hot-loader](https://github.com/gaearon/react-hot-loader)，这个东西还是超屌的。


## 关于一些规则

* es6的写法，所以当然也可以使用高级的东西，比如async啊promise这些，因为babel-runtime了，当然合并出来的文件肯定会大一些的哈。
* 关于样式的定义最好遵循 [bem](https://css-tricks.com/bem-101/) 对于component来说感觉最合适，然后是scss的
* 关于flux部分，使用了[redux](https://github.com/rackt/redux) 所以我们使用store的时候都使用reducer来做，可以参考其开发文档，其实大概只要明白每次发生action的时候只要不要去直接改变原来的state而是改变它的copy就好
* 关于redux，遵循[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux),个人觉得屌屌的，比起其他的简明很多
* eslint 可以参考.eslintrc 当然其实就是把tab定义为2个，然后请使用'，而不是"来定义字符串什么的