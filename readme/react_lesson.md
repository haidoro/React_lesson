# ReactとReduxの学習ならびにフロントまわりのツールの使い方
* Macでの手順です。  
* Node.jsがインストールされている必要があります。  
またHomebrewが導入ずみであること。
* 作業フォルダを作成してcdコマンドでそのフォルダ内にカレントディレクトリを移動しておきます。


## yarn インストール
yarnはnpmの遅さに不満を感じたFacebookのエンジニアが開発したパッケージ管理ツールです。つまりnpmのようなものです。

yarnのインストールコマンド
```
$ brew install yarn
```

yarn バージョン確認コマンド
```
$ yarn --version
```

## 今回インストールするツール

yarn add を使って以下のツールをインストールします。
```
$ yarn add  webpack webpack-dev-server babel-core babel-loader babel-preset-react babel-preset-es2015
```

### webpack.config作成
webpack.config作成前に次のフォルダとファイルを作成  
* publicフォルダを作成後その中にindex.html作成
* srcフォルダ作成後その中にindex.js作成

webpack.config.jsファイル作成  
webpackの設定ファイルはwebpack.config.jsに記述します。
この記述のポイントは次の通りです。
* entry:の値で「./src/index.js」ファイルが今回表示する内容になります。
* outputがコンパイル後のファイル置き場になります。
* moduleはコンパイルする方法になります。
* devServerはローカルサーバーを立ち上げます。

webpack.config.js記述内容
```
var publidDir = __dirname + '/public';
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: publidDir,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: publidDir
  }
};

```

### サーバー起動
サーバー起動のコマンドは以下
```
$ ./node_modules/.bin/webpack-dev-server
```
ただし、packege.jsonに以下を追記するとコマンドが楽になります。
```
 "scripts":{
    "start":"./node_modules/.bin/webpack-dev-server"
},
```
簡略化したサーバー起動コマンド（今後はこのコマンド使用）
```
$ yarn run star
```
サーバー起動後、ブラウザのアドレスは「localhost:8080」
dev-serverが起動している状態でコードを編集するとリアルタイムにブラウザは更新されます。

サーバー終了はCtrl+C

## Reactの準備

reactのインポートを行います。
コマンドでyarnを使ってreactとreact-domのパッケージを導入します。今回はバージョンを指定したいのでこちらをインストールします。
```
yarn add react@15.6.1 react-dom@15.6.1
```
バージョンを指定しないで最新のものをインストールするには以下
```
yarn add react react-dom 
```

## webpackを使ってHello world
webpackとローカルのWebサーバーを使ってHello worldを表示します。ここではReactは使っていません。

HTMLの記述
```
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>React</title>
</head>
<body>
	<div class="container">
		Hello world
	</div>
	<script src="bundle.js" charset="utf-8"></script>
</body>
</html>
```

srcフォルダに空のindex.jsxファイルを作成する。

サーバー起動して表示を確認する。
```
yarn run start
```
「localhost:8080」でHello worldが表示される。
index.scssがないエラーが表示されるがとりあえずHello worldは表示されます。
エラー部分はwebpackのconfigにindex.scssの設定が記述されているためで後ほどindex.scssを作成すると問題ない。

ここで起こっていることは、index.jsが呼び出されるとコンパイルされてbundle.jsとなって表示されている。が、実際にbandle.jsファイルが作成された訳ではない。

実運用の時はdev-serverではなく、下記のコマンドとしてファイルを実際に書き出させます。
```
./node_modules/.bin/webpack
```
### scssファイル追加
stylesheetsフォルダにindex.scssファイルを追加
ならびにSASSコンパイルの設定をwebpack.config.jsファイルに記述。

## Reactでhello!!!
index.jsxを修正
```
import React from 'react';
import ReactDOM from 'react-dom';
```
Reactはアプリなどを作成するためのネイティブなreactライブラリ
ReactDOMはブラウザ専用のreactライブラリ

次にrender関数を使ってみます。
index.jsxの続き
```
ReactDOM.render(<div>Hello React!!</div>,document.querySelector('.container'));
```
render()の第1引数はJSX構文が入ります。

index.htmlの「Hello world」は必要ないので削除します。

ここで再びサーバーをスタートします。

```
yarn run start
```
http://localhost:8080 で確認します。

検証の画面のsourceタブでbundle.jsを確認できますのでコードを確認しましょう。index.jsxに記述した内容が複雑なコードに変わっているのを確認できるはずです。

## React開発の流れ
Reactを使った開発は基本的にコンポーネントを組み合わせて行います。コンポーネントの作り方はFunctional Compornet とClass Component の2つの方法がある。

### Functional Compornetの例
app.js
```
import React from 'react';

function App(props){
  return (<div>Hello from function App</div>);
}

export default App;

```

index.jsx
```
import React from "react";
import ReactDOM from "react-dom";

import App from './components/app';

ReactDOM.render(<App />, document.querySelector('.container'));
```

### Class Componentの例

app.js
```
import React, { Component } from "react";

class App extends Component {
  render() {
    return <div>Hello from class App</div>;
  }
}

export default App;
```

app.jsx
```
import React, { Component } from "react";

class App extends Component {
  render() {
    return <div>Hello from class App</div>;
  }
}

export default App;
```

## props
親コンポーネントから子コンポーネントに情報を渡すことができる。stateを持たないコンポーネントを作ることができる。

app.jsx
```
import React, { Component } from 'react';

import Greeting from './greeting';

class App extends Component {
    render() {
        return <div>
            <Greeting name="John"/>
            <Greeting name="Bob" />
          </div>;
    }
}

export default App;
```

greeting.jsx
```
import React, { PropTypes } from 'react';

function Greeting(props) {
  return (<div>Hi {props.name}!</div>);
}
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
```

## Stateを持たせる

app.jsx
```
import React, { Component } from 'react';

import Greeting from './greeting';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Bob',
    };
  }

  handleMouseOver() {
    this.setState({ name: 'Bob' });
  }

  handleMouseOut() {
    this.setState({ name: 'Mike' });
  }

  render() {
    return (
      <div
        onMouseOver={() => this.handleMouseOver()}
        onMouseOut={() => this.handleMouseOut()}
      >
        <Greeting name={this.state.name} />
      </div>
    );
  }
}


export default App;
```

## ユーザー入力情報を表示

app.jsx
```
import React, { Component } from 'react';

import Greeting from './greeting';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'John',
    };
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.handleNameChange(e.target.value)}
        />
        <button onClick={() => this.handleNameChange('Bob')}>I am Bob</button>
        <Greeting name={this.state.name} />
      </div>
    );
  }
}

export default App;
```

greeting.jsx
```
import React, { PropTypes } from 'react';

function Greeting(props) {
  return (<div>Hi {props.name}!</div>);
}
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
```

index.jsx
```
import React, { PropTypes } from 'react';

function Greeting(props) {
  return (<div>Hi {props.name}!</div>);
}
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
```

## Geocode取得
緯度経度を取得するにはGoogle Maps APIを使います。
[Geocoding API
](https://developers.google.com/maps/documentation/geocoding/intro)

Geocode取得のためにまずaxiosをimportします。
```
import axios from 'axios';
```
具体的に取得するための関数
```
const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

handlePlaceSubmit(place){
    axios.get(GEOCODE_ENDPOINT,{ params: {address: place} })
    .then((results) =>{
      console.log(results);
      const data = results.data;
      const result = results.data.results[0];
      if(data.status === 'OK'){
        const location = result.geometry.location;
        this.setState({
        address: result.formatted_address,
        lat: location.lat,
        lng: location.lng,
      })
      }else if(data.status === 'ZERO_RESULTS'){
        this.setState({
        address: '結果が見つかりませんでした',
        lat: '***',
        lng: '***',
      })
      }else{
        this.setState({
        address: 'エラーです',
        lat: '***',
        lng: '***',
      })
      }
  })
  .catch((error) => {
    this.setState({
      address: '通信エラーです',
      lat: '***',
      lng: '***',
    })
  })
  }

```

ここで作成したApp.jsx
```
import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  handlePlaceSubmit(place){
    axios.get(GEOCODE_ENDPOINT,{ params: {address: place} })
    .then((results) =>{
      console.log(results);
      const data = results.data;
      const result = results.data.results[0];
      if(data.status === 'OK'){
        const location = result.geometry.location;
        this.setState({
        address: result.formatted_address,
        lat: location.lat,
        lng: location.lng,
      })
      }else if(data.status === 'ZERO_RESULTS'){
        this.setState({
        address: '結果が見つかりませんでした',
        lat: '***',
        lng: '***',
      })
      }else{
        this.setState({
        address: 'エラーです',
        lat: '***',
        lng: '***',
      })
      }
  })
  .catch((error) => {
    this.setState({
      address: '通信エラーです',
      lat: '***',
      lng: '***',
    })
  })
  }

  render() {
    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult address={this.state.address} lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}

export default App;

```










