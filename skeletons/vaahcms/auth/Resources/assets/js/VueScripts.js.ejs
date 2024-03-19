
let VueCommon = Vue.extend({

    methods: {

        //---------------------------------------------------------------------
        async ajaxGet(url, params, callback )
        {

            axios.defaults.headers.common = null;

            let q = {
                params: params
            };

            let data = await axios.get(url, q)
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
        async ajax(url, params, callback, query )
        {

            let token = document.getElementById('_token').getAttribute('content');
            //To make axios request as ajax request
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': token,
            };

            let q = {
                params: query
            };

            let data = await axios.post(url, params, q)
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

                    console.log('--->error', error);

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
            if(response.data.status || 'success' in response.data)
            {
                if((response.data.status && response.data.status === 'failed' )
                    ||  !response.data.success )
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

                if((response.data.status && response.data.status === 'success' )
                    || response.data.success )
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
        toastSuccess(messages){

            let list_html = "";
            let i = 1;

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

            let duration = this.getMessageTime(list_html);

            if(list_html != "")
            {
                this.$buefy.toast.open({
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

            let duration = this.getMessageTime(list_html);

            if(list_html != "")
            {
                this.$buefy.snackbar.open({
                    message: list_html,
                    position: 'is-top',
                    type: 'is-danger',
                    duration: duration,
                    queue: false
                });
            }



        },
        //---------------------------------------------------------------------
        getMessageTime(str)
        {
            let i = 1;
            let duration = 2000;
            let duration_min = 2000;
            let duration_max = 15000;
            let leng = 0 ;

            leng = str.length;

            duration = leng*duration/25;

            if(duration < duration_min)
            {
                duration = duration_min;
            }

            if(duration > duration_max)
            {
                duration = duration_max;
            }

            console.log('duration', duration+' ms');

            return duration;
        },
        //---------------------------------------------------------------------
        getClipboardValue: function (e) {

            let text =  (!!e.clipboardData)? e.clipboardData.getData("text/plain") : window.clipboardData.getData("Text");

            return text;
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
        //---------------------------------------------------------------------

    }

});

//==============================================

let base_url = document.getElementsByTagName("base")[0].getAttribute("href");
let current_url = document.getElementById("current_url").getAttribute("content");

const authApp = new VueCommon({
    el: '#frontendApp',
    data: {
        base_url: base_url,
        current_url: current_url,
        assets: null,
        is_btn_loading: false,
        is_btn_loading_otp: false,
        is_input_loading: false,
        is_input_message: null,
        is_input_type: null,
        btn_generate_otp_loading: null,
        btn_reset_code_loading: null,
        is_input_disabled: true,
        labelPosition: 'on-border',
        search_delay: null,
        search_delay_time: 600,
        selected_framework: null,
        search_category: '',
        blocks_create:{
            name: null,
            description: null,
            framework: null,
            category: null,
            code: null,
        },
        login: {
            email: null,
            password: null,
            type: 'password',
            forgot_password: null,
            password_confirmation: null,
            reset_password_code: null,
            attempts: 0,
            login_otp: {
                otp_0: null,
                otp_1: null,
                otp_2: null,
                otp_3: null,
                otp_4: null,
                otp_5: null,
            },
            max_attempts: 5,
            is_password_disabled: null,
        },
        signup: {
            company_name: null,
            name: null,
            email: null,
            password: null,
            apps: [],

        },
        signup_invite: {
            invite_status: null,
            first_name: null,
            last_name: null,
            email: null,
            password: null,
        },
        activate: {
            sub_domain: null,
            is_sub_domain_available: null,
        },
    },
    computed: {

    },
    watch: {
        'login.type': {
            deep: true,
            handler(new_val, old_val) {

                if(new_val === 'otp')
                {
                    this.login.forgot_password = null;
                    this.login.is_password_disabled = true;
                    this.login.password = null;
                } else
                {
                    this.login.is_password_disabled = false;
                    this.login.password = null;
                }
            }
        },

        'login.forgot_password': {
            deep: true,
            handler(new_val, old_val) {

                if(new_val === true)
                {
                    this.login.login_via_otp = null;
                    this.login.is_password_disabled = true;
                    this.login.password = null;
                } else
                {
                    this.login.is_password_disabled = false;
                    this.login.password = null;
                }
            }
        },

    },
    mounted: function () {


        //---------------------------------------------
        //this.getAssets();
        //---------------------------------------------
    },
    methods:{
        //---------------------------------------------
        getAssets: function () {
            let params = {};
            let url = this.base_url+'/assets';
            this.ajax(url, params, this.getAssetsAfter);
        },
        //---------------------------------------------------------------------
        getAssetsAfter: function (data) {
            this.assets = data;
        },
        //---------------------------------------------
        moveToElement: function (event, next_el_id, previous_el_id) {

            console.log('--->event.key', event.key);

            if(event.key === 'v'
                || event.key === 'V'
                || event.key === 'Control'
            )
            {
                return false
            }

            let otp_val = event.target.value;

            if (event.key === "Backspace" || event.key === "Delete") {
                if(previous_el_id)
                {
                    document.getElementById(previous_el_id).focus();
                }
            } else
            {
                if(next_el_id)
                {
                    document.getElementById(next_el_id).focus();
                }
            }
        },
        //---------------------------------------------
        onOtpPaste: function(event)
        {
            let paste_otp =  this.getClipboardValue(event);

            if(paste_otp)
            {
                paste_otp = paste_otp.trim();
                paste_otp = paste_otp.replace(" ", '');
                paste_otp = paste_otp.trim();
                let otp_arr = paste_otp.split("");

                let otp_val;
                let otp_index;

                if(otp_arr.length > 0)
                {
                    for(let index in otp_arr)
                    {
                        otp_index = 'otp_'+index;
                        otp_val = otp_arr[index];
                        this.login.login_otp[otp_index] = otp_val;
                    }
                }
            }


        },
        //---------------------------------------------
        loginPost: function (e) {
            e.preventDefault();
            this.is_btn_loading = true;
            var url = this.base_url+'/signin/post';
            var params = this.login;
            this.ajax(url, params, this.loginPostAfter);
        },
        //---------------------------------------------
        loginPostAfter: function (data) {
            this.is_btn_loading = false;

            if(data && data.redirect_url)
            {
                window.location.href = data.redirect_url;
            }
        },
        //---------------------------------------------
        generateOtp: function (e) {
            e.preventDefault();

            if(this.login.attempts > 1)
            {
                let messages = [
                    "Maximum attempts to generate OTP has been reached"
                ];
                this.toastErrors(messages)

                return false;
            }

            this.btn_generate_otp_loading = true;
            var url = this.base_url+'/signin/send/otp';
            var params = this.login;
            this.ajax(url, params, this.generateOtpAfter);
        },
        //---------------------------------------------
        generateOtpAfter: function (data) {
            this.btn_generate_otp_loading = false;
            this.login.attempts++;
        },
        //---------------------------------------------
        sendResetPasswordCode: function (e) {
            e.preventDefault();
            this.btn_reset_code_loading=true;
            let params = this.login;
            let url = this.base_url+'/signin/send/reset/code';
            this.ajax(url, params, this.sendResetPasswordCodeAfter);
        },
        //-----------------------------------------------
        sendResetPasswordCodeAfter: function (data, res) {
            this.btn_reset_code_loading=false;
        },
        //---------------------------------------------
        resetPasswordAndLogin: function (e) {
            e.preventDefault();
            let params = this.login;
            let url = this.base_url+'/signin/password/reset';
            this.ajax(url, params, this.loginPostAfter);
        },
        //-----------------------------------------------

        //---------------------------------------------
        //---------------------------------------------
        signupPost: function (e) {

            e.preventDefault();

            this.is_btn_loading = true;
            var url = this.base_url+'/signup/post';
            var params = this.signup;
            this.ajax(url, params, this.signupPostAfter);
        },
        //---------------------------------------------
        signupPostAfter: function (data) {
            this.is_btn_loading = false;

            if(data && data.redirect_url)
            {
                this.signup = {
                    name: null,
                    email: null,
                    password: null,
                }
                window.location.href = data.redirect_url;
            }

        },
        //---------------------------------------------
       activateAccount: function (e,code) {

           e.preventDefault();

           this.is_btn_loading = true;
           var url = this.base_url+'/signup/activate/'+code+'/post';
           var params = {};
           this.ajax(url, params, this.activateAccountAfter);
       },
        //---------------------------------------------
        activateAccountAfter: function (data) {
            this.is_btn_loading = false;
            if(data && data.redirect_url)
            {
                let messages = [
                    'Redirecting to sign in page in 5 seconds'
                ];

                this.toastSuccess(messages);

                setTimeout(function(){
                    window.location.href = data.redirect_url;
                }, 5000);

            }
        },
        //---------------------------------------------
        checkStopWords: function (str) {

            let words = require( "./../json/stop-words.json");
            if(words.indexOf(str) !== -1){
                return true
            }
            return false;
        },
        //---------------------------------------------



    },
});

//================================================================================

//================================================================================
