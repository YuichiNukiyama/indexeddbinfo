indexeddbinfo
=============

Summary
The indexeddbinfo is JavaScript library which is MIT Lisence.
This library show indexed dabase's data like Developer Tools.
So, this lirary ease your debug. Especially You are debugging with IE.
This library correspond jQuery gt 2.1.1.And based on Indexed Database API W3C Candidate Recommendation 04 July 2013
サマリー
indexeddbinfoはMITライセンスで提供しているクラスライブラリです。
Google Chromeなどに実装されている開発者ツールのように、IndexedDBが保持している
オブジェクトストアのデータを表示してくれます。IEなど開発者ツールでIndexedDBのデータが見れない
環境でIndexedDBを実装やデバッグする際に役立つでしょう。

Usage
You should prepare jQuery Library and indexeddbinfo.
And, call $().indexedDbInfo("databaseName") method.
That's  all.
使い方
jQueryライブラリとindexeddbinfoを用意して
call $().indexedDbInfo("databaseName") を呼び出すだけです。
このメソッドが唯一のメソッドのため、ほかの名前空間と競合しにくいです。

Sample
<script src="jquery-2.1.1.js"></script>
<script src="indexeddbinfo.js"></script>
<script>$().indexedDbInfo("databaseName");</script>