 /*
 * indexeddbinfo
 *
 * Copyright 2014 Nukiyama Yuichi
 * Released under the MIT license
 * 
 * Date: 2014-11-11
 */

; (function ($) {
$.fn.indexedDbInfo = function( dbName ){
	//database
    var idb = window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB,
        request,
        db,
        version,
        storeLength,
        stores,
		storeName,
		transaction,
		store,
        autoInc,
		keyPath,
        cursor;
	
	//Tables
    var table,
        caption,
		tr,
        th,
		td;

	//CSS settings
    var tableCss = {
    "table-layout": "auto",
	"border": "1px solid #ccc",
	"border-collapse": "separate",
	"border-spacing": "0.5px",
	"min-height": ".01%",
	"width": "80%",
	 "overflow-x":"auto"
    },
    captionCss = {
    "background-color": "pink"
    },
    thCss = {
        "padding": "4px",
		"marigin": "2px",
		"background-color": "#ccc",
		"border": "1px solid black",
		"width": "40%",
		"text-align": "left"
    },
	tdCss = {
	    "padding": "4px",
	    "marigin": "2px",
	    "border": "1px solid black",
		"width": "60%"
	},
    containerDivCss = {
        "word-wrap": "break-word",
		"margin-right": "auto",
		"margin-left": "auto"
    };

    //responsive
	if (window.matchMedia("(max-width: 767px)").matches) {
	    var responsiveCss = {
	        "width":"100%",
	        "margin-bottom": "15px",
	        "overflow-y":"hidden",
	        "-ms-overflow-style": "-ms-autohiding-scrollbar"
	    }
	    $.extend(tableCss, responsiveCss);
	}

	//container
    var containerDiv = $("<div>").css(containerDivCss),
        div;

	//basic information
	div = $("<div>");
	table = $("<table>");
	table.css(tableCss);

	//create caption
	caption = $( "<caption>" );
	caption.css( captionCss );
	caption.text( "■General Information" );
	table.append( caption );

	//show UserAgent
	tr = $( "<tr>" );
	th = $( "<th>" ).text("UserAgent").css( thCss );
	td = $( "<td>" ).text(navigator.userAgent).css( tdCss );
	tr.append( th ).append( td );
	table.append(tr);

    //show Domain
	tr = $("<tr>");
	th = $("<th>").text("origin").css(thCss);
	td = $("<td>").text(location.origin).css(tdCss);
	tr.append(th).append(td);
	table.append(tr);

	//show Support
	tr = $( "<tr>" );
	th = $( "<th>" ).text("Support of Indexed Database").css( thCss );
	td = $( "<td>" ).css( tdCss );
	if( idb ){
		td.text( "true" );
	}else{
		td.text( "false" );
	}
	tr.append( th ).append( td );
	table.append( tr );

	//show needs of venderPrefix
	tr = $( "<tr>" );
	th = $( "<th>" ).text("venderPrefix").css( thCss );
	td = $( "<td>" ).css( tdCss );
	if( window.indexedDB ){
		td.text( "unnecessary" );
	}else if( window.webkitIndexedDB ){
		td.text( "webkit" );
	}else if( window.mozIndexedDB ){
		td.text( "moz" );
	}else{
		td.text( "-" );
	}
	tr.append( th ).append( td );
	table.append( tr );
	div.append( table );
	containerDiv.append( div );

	if (idb && dbName) {
	    request = idb.open(dbName);
	    request.onsuccess = function () {
	        db = this.result;
	        version = db.version;
	        storeLength = db.objectStoreNames.length;

	        //indexedDB information
	        div = $("<div>");
	        table = $("<table>");
	        table.css(tableCss);

	        //create caption
	        caption = $("<caption>");
	        caption.css( captionCss );
	        caption.text("■Indexed Datase Information");
	        table.append(caption);

	        //show Database Name
	        tr = $("<tr>");
	        th = $("<th>").text("Database Name").css(thCss);
	        td = $("<td>").text(dbName).css(tdCss);
	        tr.append(th).append(td);
	        table.append(tr);

	        //show Database Version
	        tr = $("<tr>");
	        th = $("<th>").text("Version").css(thCss);
	        td = $("<td>").text(version).css(tdCss);
	        tr.append(th).append(td);
	        table.append(tr);

	        //show Number of ObjectStores
	        tr = $("<tr>");
	        th = $("<th>").text("Number of ObjectStores").css(thCss);
	        td = $("<td>").text(storeLength).css(tdCss);
	        tr.append(th).append(td);
	        table.append(tr);

	        //show ObjectStore names
	        for (var i = 0; i < storeLength; i++) {
	            tr = $("<tr>");
	            th = $("<th>").text("ObjectStore Name").css(thCss);
	            td = $("<td>").text(db.objectStoreNames[i]).css(tdCss);
	            tr.append(th).append(td);
	            table.append(tr);
	        }

	        //append to container
	        div.append(table);
	        containerDiv.append(div);

            //if there were Object Stores, show Details
	        if (storeLength > 0) {
	            stores = db.objectStoreNames
	            transaction = db.transaction(stores);

	            function showDetails(i) {
	                storeName = stores[i];
	                store = transaction.objectStore(storeName);
	                keyPath = store.keyPath;
	                transaction.onerror = function (event) {
	                    console.log(event);
	                }
	                transaction.onsuccess = function (event) {
	                    //for debug
	                    console.log(event);
	                }
	                //ObjectStore information
	                div = $("<div>");
	                table = $("<table>");
	                table.css(tableCss);

	                //create caption
	                caption = $("<caption>");
	                caption.css(captionCss);
	                caption.text("■ObjectStore Information");
	                table.append(caption);

	                //show ObjectStore Name
	                tr = $("<tr>");
	                th = $("<th>").text("ObjectStore Name").css(thCss);
	                td = $("<td>").text(storeName).css(tdCss);
	                tr.append(th).append(td);
	                table.append(tr);

	                //show Keypath
	                tr = $("<tr>");
	                th = $("<th>").text("KeyPath").css(thCss);
	                td = $("<td>").text(keyPath).css(tdCss);
	                tr.append(th).append(td);
	                table.append(tr);

	                //show AutoIncrement
	                if (store.autoIncrement === undefined) {
	                    autoInc = "-";
	                } else {
	                    autoInc = store.autoIncrement;
	                }
	                tr = $("<tr>");
	                th = $("<th>").text("AutoIncrement").css(thCss);
	                td = $("<td>").text(autoInc).css(tdCss);
	                tr.append(th).append(td);
	                table.append(tr);

	                //show IndexNames
	                for (var j = 0; j < store.indexNames.length; j++) {
	                    tr = $("<tr>");
	                    th = $("<th>").text("IndexName").css(thCss);
	                    td = $("<td>").text(store.indexNames[j]).css(tdCss);
	                    tr.append(th).append(td);
	                    table.append(tr);
	                }

	                //show ObjectStore Data
	                var requestCursor = store.openCursor();
	                requestCursor.onsuccess = function (event) {
	                    try {
	                        cursor = event.target.result;
	                        if (cursor) {
	                            var data = cursor.value;
	                            var str = "";
	                            for (var val in data) {
	                                str += val + ":";
	                                str += data[val] + " ";
	                            }
	                            //show data
	                            tr = $("<tr>");
	                            th = $("<th>").text("Data").css(thCss);
	                            td = $("<td>").text(str).css(tdCss);
	                            tr.append(th).append(td);
	                            table.append(tr);
	                            cursor.continue();
	                        } else {
	                            //apend to container
	                            div.append(table);
	                            containerDiv.append(div);
	                            if (i < storeLength) {
	                                i += 1;
	                                showDetails(i);
	                            }
	                        }
	                    } catch (e) {
	                        console.log(e);
	                    }
	                }
	                requestCursor.onerror = function (event) {
	                    console.log(event);
	                }
	            }
	            showDetails(0);
	        }
	    }
	}
	//add container to body element
	$("body").append(containerDiv);
};
})( jQuery );