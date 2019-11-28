<?php namespace VaahCms\Theme\OhoOne\Providers;


use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;
use VaahCms\Theme\OhoOne\Providers\RouteServiceProvider;

class OhoOneServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot(Router $router)
    {

        $this->registerMiddleware($router);
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->registerFactories();
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
        $this->registerSeeders();
        $this->registerBladeDirectives();
    }


    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

        $this->app->register(RouteServiceProvider::class);
        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $this->registerHelpers();

    }

    /**
     *
     */
    private function registerMiddleware($router) {

        //register middleware
        //$router->aliasMiddleware('sample.middleware', \OhoOne\Http\Middleware\SampleMiddleware::class);

    }

    /**
     *
     */
    private function registerHelpers() {

        //load all the helpers
        foreach (glob(__DIR__.'/../Helpers/*.php') as $filename){
            require_once($filename);
        }

    }


    /**
     *
     */
    private function registerSeeders() {

        //load all the helpers
        foreach (glob(__DIR__.'/../Database/Seeds/*.php') as $filename){
            require_once($filename);
        }

    }

    /**
     * Register config.
     *
     * @return void
     */
    protected function registerConfig()
    {
        $this->publishes([
            __DIR__.'/../Config/config.php' => config_path('ohoone.php'),
        ], 'config');
        $this->mergeConfigFrom(
            __DIR__.'/../Config/config.php', 'ohoone'
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $viewPath = resource_path('/views/vaahcms/themes/ohoone');

        $sourcePath = __DIR__.'/../Resources/views';

        $this->publishes([
            $sourcePath => $viewPath
        ],'views');

        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path . '/views/vaahcms/themes/ohoone';
        }, \Config::get('view.paths')), [$sourcePath]), 'ohoone');

    }

    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('/lang/vaahcms/theme/ohoone');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'ohoone');
        } else {
            $this->loadTranslationsFrom(__DIR__ .'/../Resources/lang', 'ohoone');
        }
    }

    /**
     * Register an additional directory of factories.
     *
     * @return void
     */
    public function registerFactories()
    {
        if (! app()->environment('production')) {
            app(Factory::class)->load(__DIR__ . '/../Database/factories');
        }
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }


    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function registerBladeDirectives()
    {

        /*
        \Blade::directive('hello', function ($expression) {
            return "<?php echo 'Hello ' . {$expression}; ?>";
        });
        */

    }
}
