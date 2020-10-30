# vaahcms-module-helloworld
HelloWorld Module for VaahCMS


#### To Run Modules Dusk Test:
- Change path of dusk in `phpunit.dusk.xml` to following:
```xml
...
<directory suffix="Test.php">./VaahCms/Modules/HelloWorld/Tests/Browser</directory>
...
```

- Then run `php artisan dusk`