<?php

return [
    "name"=> "HelloWorld",
    "title"=> "Module for VaahCMS",
    "slug"=> "helloworld",
    "thumbnail"=> "https://img.site/p/300/160",
    "excerpt"=> "description",
    "description"=> "description",
    "download_link"=> "",
    "author_name"=> "helloworld",
    "author_website"=> "https://vaah.dev",
    "version"=> "0.0.1",
    "is_migratable"=> true,
    "is_sample_data_available"=> false,
    "db_table_prefix"=> "vh_helloworld_",
    "providers"=> [
        "\\VaahCms\\Modules\\HelloWorld\\Providers\\HelloWorldServiceProvider"
    ],
    "aside-menu-order"=> null
];
