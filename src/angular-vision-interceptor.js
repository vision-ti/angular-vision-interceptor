/*
 * angular-vision-interceptor
 * (c) 2014 Felipe Leonhardt http://vision-ti.com.br
 * License: MIT
 */
(function () {
    'use strict';

    angular.module('vision.interceptor', [])
        // serializer for x-www-form-urlencoded.
        .provider('vsFormUrlencodedSerializer', function () {
            return {
                $get: function () {
                    return {
                        'serialize': function (data) {

                            var params = {};
                            var param;
                            angular.forEach(data, function(value, key){

                                param = data[key];

                                if ((angular.isObject(value) && !angular.isArray(value))
                                    || (angular.isArray(value) && angular.isObject(value[0]))){
                                    param = JSON.stringify(value);
                                }

                                params[key] = param;
                            });

                            return $.param(params);
                        }
                    };
                }
            };
        }
    )
        .provider('vsFormUrlencodedInterceptor', function (vsFormUrlencodedSerializerProvider) {
            return {
                $get: function ($q) {
                    var getMediatype = function (headers) {
                        var mediatype = 'json';

                        // If Content-Type is set, use that.
                        if (angular.isDefined(headers['Content-Type']) && headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                            mediatype = 'form-urlencoded';
                        }
                        return mediatype;
                    };

                    return {
                        // Serialize the data.
                        'request': function (config) {
                            if (angular.isDefined(config.headers) && getMediatype(config.headers) == 'form-urlencoded') {
                                var serializer = vsFormUrlencodedSerializerProvider.$get();
                                config.data = serializer.serialize(config.data);
                            }
                            return config || $q.when(config);
                        }
                    };
                }
            };
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('vsFormUrlencodedInterceptor');
        }]);
})();