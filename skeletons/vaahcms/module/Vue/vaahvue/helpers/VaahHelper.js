import Vue from 'vue';
import axios from "axios";
let moment = require('moment-timezone');
let timezone = document.getElementById('app_timezone').getAttribute("content");
moment.tz.setDefault(timezone);

import copy from 'copy-to-clipboard';

import {store} from './../../store/store';
import {ToastProgrammatic as Toast} from "buefy";
import {SnackbarProgrammatic as Snackbar} from "buefy";


var debug = document.getElementById('debug').getAttribute('content');

const VaahHelper = {
    options: {},
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    setOptions (options) {
        this.options = options;
        return this
    },
    //---------------------------------------------------------------------

    async ajaxGet(url, params, callback )
    {

        axios.defaults.headers.common = null;

        let q = {
            params: params
        };

        let data = await Vue.axios.get(url, q)
            .then(response => {
                if(response.data.status)
                {
                    if(response.data.status === 'failed')
                    {
                        if(response.data.messages)
                        {
                            this.toastErrors(response.data.messages);
                        }

                        if(response.data.errors)
                        {
                            this.toastErrors(response.data.errors);
                        }
                    }
                    if(response.data.status === 'success')
                    {
                        if(response.data.messages)
                        {
                            this.toastSuccess(response.data.messages);
                        }
                    }
                }

                if(callback)
                {
                    if(response.data && response.data.data)
                    {
                        callback(response.data.data, response);
                    } else
                    {
                        callback(false, response);
                    }
                }

                return response;
            })
            .catch(error => {

                if(debug == true)
                {
                    console.log('--->error', error);

                    this.toastErrors([error]);
                } else
                {
                    this.toastErrors(['Something went wrong']);
                }

                if(callback) {
                    callback(false, error);
                }

                return error;
            });

        return data;
    },

    //---------------------------------------------------------------------
    async ajax(url, params, callback, query, headers=null )
    {

        //To make axios request as ajax request
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
        };

        let q = {
            params: query
        };

        if(headers)
        {
            q.headers = headers;
        }

        console.log('--->', params);


        let data = await Vue.axios.post(url, params, q)
            .then(response => {
                this.processResponse(response);
                if(callback)
                {
                    if(response.data && response.data.data)
                    {
                        callback(response.data.data, response);
                    } else
                    {
                        callback(false, response);
                    }
                }

                return response;

            })
            .catch(error => {

                if(error.response && error.response.status
                && error.response.status == 401)
                {
                    this.toastErrors(['Session Expired']);
                    location.reload();
                }

                this.processError(error);

                if(callback) {
                    callback(false, error);
                }

                return error;
            });

        return data;
    },
    //---------------------------------------------------------------------
    processResponse: function(response)
    {
        if(response.data.status)
        {
            if(response.data.status === 'failed')
            {
                if(response.data.messages)
                {
                    this.toastErrors(response.data.messages);
                }

                if(response.data.errors)
                {
                    this.toastErrors(response.data.errors);
                }
            }
            if(response.data.status === 'success')
            {
                if(response.data.messages)
                {
                    this.toastSuccess(response.data.messages);
                }
            }
        }



        return response;
    },
    //---------------------------------------------------------------------
    processError: function(error)
    {
        if(debug == true)
        {
            console.log('--->error', error);
            this.toastErrors([error]);
        } else
        {
            this.toastErrors(['Something went wrong']);
        }
    },
    //---------------------------------------------------------------------
    updateRootState: function(state_name, state_value)
    {
        let payload = {
            'key': state_name,
            'value': state_value,
        };
        store.commit('root/updateState', payload)
    },
    //---------------------------------------------------------------------
    updateState: function(update)
    {
        let payload = {
            'key': update.state_name,
            'value': update.state_value,
        };
        store.commit(update.namespace+'/updateState', payload)
    },
    //---------------------------------------------------------------------
    updateFiltersFromURL: function( state_name, namespace, route)
    {

        if(route.query) {

            let query = JSON.parse(JSON.stringify(route.query));
            let store_var = store.getters[namespace+'/state'][state_name];

            let filters = store_var.filters;

            for(let key in filters)
            {
                if(query.hasOwnProperty(key))
                {
                    filters[key] = query[key];
                }
            }

            store_var.filters = filters;

            let update = {
                state_name: state_name,
                state_value: store_var,
                namespace: namespace
            };

            this.updateState(update);
        }
    },
    //---------------------------------------------------------------------


    //---------------------------------------------------------------------
    confirmCopiedData: function(data)
    {
        Toast.open({
            container: '#buefy-snackbar',
            message: 'Copied',
            type: 'is-success'
        });
    },
    //---------------------------------------------------------------------
    toastSuccess(messages){

        let list_html = "";
        let i = 1;
        let duration = 1000;
        if(messages.length > 1)
        {
            messages.forEach(function (error) {
                list_html += i+") "+error+"<br/>";
                i++;
            });
        } else
        {
            if(messages[0])
            {
                list_html += messages[0];
            }
        }



        if(list_html != "")
        {
            Toast.open({
                container: '#buefy-snackbar',
                message: list_html,
                type: 'is-success',
                duration: duration*i
            });
        }


    },
    //-----------------------------------------------------------------
    toastErrors(messages){
        let list_html = "";
        let i = 1;
        let duration = 2000;

        if(messages.length > 1)
        {
            messages.forEach(function (error) {
                list_html += i+") "+error+"<br/>";
                i++;
            });
            duration = duration*i;
        } else
        {
            if(messages[0])
            {
                list_html += messages[0];
                let leng = list_html.length;
                duration = leng*duration/10;


            }


        }

        console.log('duration', duration+' ms');
        console.log('--->', list_html);

        if(list_html != "")
        {
            Snackbar.open({
                container: '#buefy-snackbar',
                message: list_html,
                position: 'is-top',
                type: 'is-danger',
                duration: duration
            });
        }



    },
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    copy: function(data, confirm=true)
    {
        copy(data);
        this.toastSuccess(['Copied']);
    },
    //---------------------------------------------------------------------
    console: function (data, label='--->') {

        let debug = document.getElementById('debug')
            .getAttribute('content');
        if(debug && debug === true)
        {
            console.log(label, data);
        }
    },
    //---------------------------------------------------------------------
    updateCurrentURL: function(query,router)
    {
        if(query)
        {
            if(Object.keys(query).length > 0)
            {
                query = JSON.parse(JSON.stringify(query));
                query = this.removeEmpty(query);
                router.replace({ query: query }).catch(err => {});
            }
        }

    },
    //---------------------------------------------------------------------
    findAndReplaceString:  function (find_string, replace_string, full_string ) {
        return full_string.replace(find_string, replace_string);
    },
    //---------------------------------------------------------------------
    findAndReplace: function(arr, key, data) {
        let index =null;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i][key] == data[key])
            {
                index = i;
            }
        }

        if(index != null)
        {
            arr[index] = data;
            return arr;
        }

        return false;
    },
    //---------------------------------------------------------------------
    updateArray: function(array, updatedElement) {
        const index = array.indexOf(updatedElement);
        array[index] = updatedElement;
        return array;
    },

    //---------------------------------------------------------------------
    removeFromArray: function(arr, element) {
        let removeIndex = arr.map(function(item) { return item; }).indexOf(element);
        console.log('index', removeIndex);
        return arr.splice(removeIndex, 1);
    },

    //---------------------------------------------------------------------
    removeEmpty: function(obj) {
        let self = this;
        Object.keys(obj).forEach(function(key) {
            if (obj[key] && typeof obj[key] === 'object'){
                self.removeEmpty(obj[key]);
            }
            else if (obj[key] == null || obj[key] == '') {
                delete obj[key]
            }
        });

        return obj;

    },

    //---------------------------------------------------------------------
    findInArrayByKey: function (array, key, value) {

        if(!Array.isArray(array))
        {
            return false;
        }

        let element = null;

        array.map(function(item, index) {

            if(item[key] == value)
            {
                element = item;
            }

        });

        return element;
    },
    //---------------------------------------------------------------------
    pluckFromObject: function(obj, key)
    {
        if(Object.keys(obj).length < 1)
        {
            return false;
        }

        let list = [];
        for(let index in obj)
        {
            console.log('--->', obj[index]);
            console.log('--->', obj[index][key]);

            list.push(obj[index][key]);
        }

        return list;
    },
    //---------------------------------------------------------------------
    toggle: function(item)
    {
        console.log('--->', item);
        if(item == true)
        {
            return false;
        } else
        {
            return true;
        }
    },
    //---------------------------------------------------------------------
    testReturn: function()
    {
        return 'value-----';
    },
    //---------------------------------------------------------------------
    removeInArrayByKey: function (array, element, key) {

        if(!Array.isArray(array))
        {
            return false;
        }

        array.map(function(item, index) {

            if(item[key] == element[key])
            {
                array.splice(index, 1);
            }


        });

        return array;
    },
    //---------------------------------------------------------------------
    existInArray: function(array, element) {
        const index = array.indexOf(element);

        if(index == -1)
        {
            return false;
        } else
        {
            return true;
        }
    },
    //---------------------------------------------------------------------

    existInArrayByKey: function (array, element, key) {
        let exist = false;
        if(!Array.isArray(array))
        {
            return false;
        }
        array.map(function(item) {

            if(item[key] == element[key])
            {
                exist = true;
            }

        });

        return exist;
    },
    //---------------------------------------------------------------------
    limitString: function (string, characters) {

        if(string != "" && string != null)
        {
            if(string.length > characters){
                string = string.substring(0,characters)+"...";
            }
        }

        return string;
    },
    //---------------------------------------------------------------------
    formatDate: function (value) {
        if(!value)
        {
            return "";
        }
        return moment(value).format('YYYY-MM-DD');
    },
    //---------------------------------------------------------------------
    formatTime: function (value, format='HH:mm') {
        if(!value)
        {
            return "";
        }
        return moment(value).format(format);
    },
    //---------------------------------------------------------------------
    formatTimeUnix: function (value, format='HH:mm:ss') {
        if(!value)
        {
            return "";
        }
        return moment.unix(value).format(format);
    },
    //---------------------------------------------------------------------
    formatTimeUTC: function (value, format='HH:mm') {
        if(!value)
        {
            return "";
        }
        return moment.utc(value).format(format);
    },
    //---------------------------------------------------------------------
    formatDateTimeUTC: function (value) {
        if(!value)
        {
            return "";
        }
        return moment.utc(value).format('YYYY-MM-DD HH:mm:ss')
    },
    //---------------------------------------------------------------------
    formatDateTime: function (value, format='YYYY-MM-DD HH:mm:ss') {
        if(!value)
        {
            return "";
        }
        return moment(value).format(format)
    },
    //---------------------------------------------------------------------
    fromNow: function (value) {

        if(!value)
        {
            return null;
        }

        if(store.getters['root/state'].assets.timezone)
        {
            let timezone = store.getters['root/state'].assets.timezone;
            moment.tz.setDefault(timezone);
        }

        return moment(value).fromNow();
    },

    //---------------------------------------------------------------------
    ago: function (value) {

        if(!value)
        {
            return null;
        }

        if(store.getters['root/state'].assets.timezone)
        {
            let timezone = store.getters['root/state'].assets.timezone;
            moment.tz.setDefault(timezone);
        }

        let dt = store.getters['root/state'].assets.server_date_time;

        let server = moment(dt);
        let time = moment(value);

        if(time.isAfter(server)){
            return server.from(time);
        }
        return time.fromNow();

    },
    //---------------------------------------------------------------------
    currentDate: function () {
        return moment().format('YYYY-MM-DD')
    },
    //---------------------------------------------------------------------
    currentDateTime: function () {
        return moment().format('YYYY-MM-DD HH:mm:ss')
    },
    //---------------------------------------------------------------------
    dateForHumans: function (value) {
        if(!value)
        {
            return null;
        }
        return moment(value).format('ddd, MMM DD, YYYY')
    },
    //---------------------------------------------------------------------
    dateTimeForHumans: function (value) {

        if(!value)
        {
            return null;
        }

        return moment(value).format('YYYY-MM-DD hh:mm A')
    },
    //---------------------------------------------------------------------
    dateTimeForHumansWithDay: function (value) {
        if(!value)
        {
            return null;
        }
        return moment(value).format('YYYY MMM DD hh:mm A (dddd)')
    },
    //---------------------------------------------------------------------
    hasPermission: function (permissions, slug) {

        if(!permissions)
        {
            return false;
        }

        if(permissions.length < 1)
        {
            return false;
        }

        return permissions.indexOf(slug) > -1 ? true : false;
    },
    //---------------------------------------------------------------------
    paginate: function (event, page) {
        event.preventDefault();
        this.current_page = page;
        this.listLoader();
    },
    //---------------------------------------------------------------------
    makePagination: function (data) {
        this.pagination = Pagination.Init(data.last_page, this.current_page, 3);
    },
    //---------------------------------------------------------------------
    paginateIsActive: function (page) {
        if(page == this.current_page)
        {
            return true;
        }
        return false;
    },
    //---------------------------------------------------------------------
    toIndianFormat: function (nStr) {

        if(nStr < 0)
        {
            return nStr;
        }

        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        let rgx = /(\d+)(\d{3})/;
        let z = 0;
        let len = String(x1).length;
        let num = parseInt((len/2)-1);

        while (rgx.test(x1))
        {
            if(z > 0)
            {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            else
            {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
                rgx = /(\d+)(\d{2})/;
            }
            z++;
            num--;
            if(num == 0)
            {
                break;
            }
        }
        return x1 + x2;
    },
    //---------------------------------------------------------------------
    toLabel: function(str)
    {
        if(typeof str === 'string' )
        {
            str = str.replace(/_/g, " ");
            str = this.toUpperCaseWords(str);
            return str;
        }

    },
    //---------------------------------------------------------------------
    toUpperCaseWords: function(str)
    {
        if(str)
        {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    //---------------------------------------------------------------------
    currencyToSymbol: function (currency) {

        if(currency == "USD")
        {
            return "&#36;";
        } else if(currency == "INR")
        {
            return "&#8377;";
        } else
        {
            return currency;
        }
    },
    //---------------------------------------------------------------------
    setCookies: function (cookie_name, value, expiry_days) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiry_days);
        let c_value = escape(value) + ((expiry_days == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = cookie_name + "=" + value;
    },
    //---------------------------------------------------------------------
    getCookies: function (cookie_name) {
        let i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == cookie_name) {
                return unescape(y);
            }
        }
    },
    //---------------------------------------------------------------------
    deleteCookies: function (cookie_name) {
        this.setCookies(cookie_name,undefined,-1);
    },
    //---------------------------------------------------------------------
    shiftToTop: function (arr, key, value)
    {
        let index =null;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i][key] == value)
            {
                index = i;
            }
        }

        if(index != null)
        {
            let old_index = index;
            let new_index = 0;

            if (new_index >= arr.length) {
                let k = new_index - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing purposes
        }



    },
    //---------------------------------------------------------------------
    timeDifferenceInSeconds: function (started_at,ended_at) {
        let ms = moment(ended_at,"YYYY-MM-DD HH:mm:ss").diff(moment(started_at, "YYYY-MM-DD HH:mm:ss"));
        let seconds = ms/1000;
        return seconds;
    },
    //---------------------------------------------------------------------
    formatUnixTime: function (timestamp, format=null) {
        let time = moment(timestamp)
        if(!format)
        {
            return time.toISOString();
        } else{
            return time.format(format);
        }
    }
    ,
    //---------------------------------------------------------------------
    timeDifferenceInMSUnix: function (old_timestamp,new_timestamp=null) {
        let start = moment(old_timestamp*1000);
        let end = moment(new_timestamp*1000);

        let diff = end.diff(start);

        return diff;
    },
    //---------------------------------------------------------------------
    timeDifferenceInSecondsUnix: function (started_at,ended_at=null) {
        started_at = moment.unix(started_at);

        if(ended_at){
            ended_at = moment.unix(ended_at);
        }else{
            ended_at = moment(); // current time
        }

        let ms = ended_at.diff(started_at);
        let seconds = ms/1000;
        return seconds;
    },
    //---------------------------------------------------------------------
    timeDifferenceInSecondsUTC: function (started_at,ended_at) {
        let ms = moment(ended_at).diff(moment(started_at));
        let seconds = ms/1000;
        return seconds;
    },
    //---------------------------------------------------------------------
    secondsToHoursMinutsSeconds: function (seconds) {

        let ms = seconds*1000;
        let d = moment.duration(ms);
        let time = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

        return time;
    },
    //---------------------------------------------------------------------
    getTimeDifferenceInHHMMSS(started_at, ended_at)
    {
        let seconds = this.timeDifferenceInSeconds(started_at, ended_at);
        let time = this.secondsToHoursMinutsSeconds(seconds);
        return time;
    },
    //---------------------------------------------------------------------
    secondsToHours: function (seconds) {

        let ms = seconds*1000;
        let d = moment.duration(ms);
        let time = d.asHours();

        return time;
    },
    //---------------------------------------------------------------------
    getTimeDifferenceInDays(started_at, ended_at)
    {
        if(!started_at || !ended_at)
        {
            return null;
        }

        let started = moment(started_at,"YYYY-MM-DD");
        let ended = moment(ended_at,"YYYY-MM-DD");

        let days = started.diff(ended, "days");

        return days;
    },
    //---------------------------------------------------------------------
    addTagToOneSignalUser: function (tag_name, tag_value) {
        if(OneSignal)
        {
            OneSignal.push(function() {
                OneSignal.getUserId(function(userId)
                {
                    OneSignal.sendTag(tag_name, tag_value);
                });
            });
        }
    },
    //---------------------------------------------------------------------
    deleteTagToOneSignalUser: function (tag_name) {
        if(OneSignal)
        {
            OneSignal.push(function() {
                OneSignal.getUserId(function(userId)
                {
                    OneSignal.deleteTag(tag_name);
                });
            });
        }
    },
    //---------------------------------------------------------------------
    openUrl: function (event, url) {
        if(event)
        {
            event.preventDefault();
        }
        window.open(url, "_blank");
    },
    //---------------------------------------------------------------------
    openPopup: function (event, url, width=600, height=500) {

        if(event)
        {
            event.preventDefault();
        }

        window.open(url,'targetWindow', `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=`+width+`,
                                    height=`+height+``);
    },
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    remainingCharacters: function (event, min_characters, max_characters, target_show_remaining) {
        if (event) {
            event.preventDefault();
        }

        let el = event.target;

        let characters = $(el).val().length;
        let remaining = max_characters-characters;

        let text = 'min:'+min_characters+' | max:'+max_characters;



        if(characters < min_characters)
        {
            text += "<span class='yellow-800'>"+" | written: "+characters+' | remaining: '+remaining+"</span>"
            $(target_show_remaining).html(text);
        }
        else if(remaining < 0 )
        {
            text += "<span class='red-800'>"+" | written: "+characters+' | remaining: '+remaining+"</span>"
            $(target_show_remaining).html(text);
        } else
        {
            text += "<span class='blue-800'>"+" | written: "+characters+' | remaining: '+remaining+"</span>"
            $(target_show_remaining).html(text);
        }

    },
    //---------------------------------------------------------------------
    randomString: function(length=6) {
        let text = "";

        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    },
    //---------------------------------------------------------------------
    updateDocumentUrlTitle: function (title, url) {
        window.history.pushState(null, title, url);
    },
    //---------------------------------------------------------------------

    //---------------------------------------------------------------------
    strToSlug: function (title,delimiter = '-') {
        let slug = "";
        // Change to lower case
        let titleLower = title.toLowerCase();
        // Letter "e"
        slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
        // Letter "a"
        slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
        // Letter "o"
        slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
        // Letter "u"
        slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
        // Letter "d"
        slug = slug.replace(/đ/gi, 'd');
        // Trim the last whitespace
        slug = slug.replace(/\s*$/g, '');
        // Change whitespace to "-"
        slug = slug.replace(/\s+/g, delimiter);

        return slug;
    },
    //---------------------------------------------------------------------
    isInt: function (n) {
        return Number(n) === n && n % 1 === 0;
    },
    //---------------------------------------------------------------------
    isFloat: function (n) {
        return Number(n) === n && n % 1 !== 0;
    },
    //---------------------------------------------------------------------
    fileNameFromUrl: function (url) {
        if (url)
        {
            var m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1)
            {
                return m[1];
            }
        }
        return null;
    },
    //---------------------------------------------------------------------
    fileExtensionFromUrl: function (url) {
        if (url)
        {
            let extension = url.split('.').pop();
            return extension;
        }
        return null;
    },
    //---------------------------------------------------------------------
    getClipboardValue: function () {

        let text =  (!!e.clipboardData)? e.clipboardData.getData("text/plain") : window.clipboardData.getData("Text");

        return text;
    },
    //---------------------------------------------------------------------
    getNonReactiveObject: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    //---------------------------------------------------------------------
    pluck: function (array, key)
    {
        return array.map(function(obj) {
            return obj[key];
        });
    },
    //---------------------------------------------------------------------
    pusherAuth(pusher_auth_url, pusher_key, pusher_cluster, params=null){

        if(debug === true) {
            console.log('params--->', params);
        }

        return  new Pusher(pusher_key, {
            authEndpoint: pusher_auth_url,
            cluster: pusher_cluster ,
            auth: {
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content')
                },
                params: params,
            }
        });
    },
    //---------------------------------------------------------------------
    pusherSubscribe: function (pusher_instance, channel_name, callback=null)
    {
        channel_name = "presence-"+channel_name;

        let channel_instance =  pusher_instance.subscribe(channel_name);


        channel_instance.bind('pusher:subscription_succeeded', function(members)
        {
            if(debug === true) {
                console.log('SubscribedToChannel -->', channel_name);
                console.log('LiveMembers -->', members);
            }

            if(callback)
            {
                callback(members);
            }

        });

        return channel_instance;

    },
    //---------------------------------------------------------------------
    pusherListenEvent: function (channel_instance, event_name, callback=null)
    {
        channel_instance.bind(event_name, function(data)
        {
            if(debug === true) {
                console.log('ReceivedFromPusher | Event--> '+event_name+' | Data --->', data);
            }

            if(callback)
            {
                callback(data);
            }
        });

    },
    //---------------------------------------------------------------------


    /*
    *  Return Js Date for  specified, month, day, week and time
    *  Note: if week_no is 0, we get date from last week
    *  Examples:
    *  - To get a date for Second Sunday in March at 2:00, use the following
    *
    *    let date = getNthDayOfMonth('March', 'Sunday', 2, '2:00');
    *
    *  - To get a date for Last Friday in October at 1:00
    *
    *    let date = getNthDayOfMonth('October', 'Friday', 0, '1:00');
    * */
    //---------------------------------------------------------------------
    getNthDayOfMonth: function(month, day, week_no, time){
        let moment_ref = moment();
        const months = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };
        const days = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 7
        };

        // set month
        moment_ref.set('month', months[month]);

        // if last week
        let date;
        if(week_no == 0){
            let m = moment_ref.clone()
                .endOf('month')                     // go to the end of the month
                .day(days[day]);


            if (m.month() !== moment_ref.month()) m.subtract(7, 'd');
            date = m.add(7 * (week_no - 1), 'd');
        }
        else{
            let m = moment_ref.clone()
                .startOf('month')                     // go to the beginning of the month
                .day(days[day]);


            if (m.month() !== moment_ref.month()) m.add(7, 'd');
            date = m.add(7 * (week_no - 1), 'd');
        }


        // get shift time
        let arr = time.split(':');
        date.set('hour',arr[0]);
        date.set('minute',arr[1]);

        return date.toDate();
    }
    //---------------------------------------------------------------------


};


export default {
    install: function(Vue, options) {
        let vaah = VaahHelper.setOptions(options);
        Vue.prototype.$vaah = vaah;
        Vue.vaah = vaah;
    }
}

export {
    VaahHelper
}
