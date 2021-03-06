clientcert-sample-nodejs: Node.js クライアント証明書認証サンプル
=====================================================================

Node.js クライアント証明書認証機能を確認するサンプルアプリです。
本サンプルプログラムは Node.js コマンドラインアプリケーションです。

本プログラムの実行には、モバイルバックエンド基盤 v7.0 以上が必要です。

BaaS サーバ 事前準備
--------------------

* システム設定 ＞ 編集 から クライアント証明書認証設定のサーバーキーに HAProxy に設定した X-SSL-Validate-Token の値を設定してください。
* テナント設定 ＞ クライアント証明書認証 ＞ 編集 から クライアント証明書認証を有効にしてください。
* 下記のいずれかの手順でクライアント証明書認証に使用するユーザの設定を行ってください。
    * テナント設定 ＞ クライアント証明書認証 ＞ 編集 から 証明書ユーザ自動登録を有効にしてください。
    * ユーザ ＞ ユーザ一覧 ＞ 追加 から クライアント証明書でのアクセス にチェックを入れてユーザを登録してください。

アプリケーション 事前設定
--------------------------

JavaScrit SDKの組み込みをしてください 。

* $ npm install

下記のファイルを本アプリケーションから読み込み可能な場所に格納してください。

* クライアント証明書(.p12形式: 秘密鍵+クライアント証明書)
* 信頼するCAの証明書(.pem形式)

Config.js.sample を Config.js にリネームして下記項目を設定してください。

* tenant
* appId
* appKey
* baseUri
* clientCert
* clientCertPassword
* trustedCaCert
* objectBucketName

Proxy が必要な場合は proxyHost, proxyPort も設定してください。

実行方法
---------
プログラムの起動は以下のようにして実施してください。

    $ node Main.js

クライアント証明書認証を使用したオブジェクトのCRUD操作の実行結果が標準出力に出力されます。

