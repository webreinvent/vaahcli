<?php namespace WebReinvent\LvTags;

use Illuminate\Support\ServiceProvider;

class LvTagsServiceProvider extends ServiceProvider {

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot() {

        $this->handleConfigs();
        // $this->handleMigrations();
        // $this->handleViews();
        // $this->handleTranslations();
        // $this->handleRoutes();
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {

        // Bind any implementations.

    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides() {

        return [];
    }

    private function handleConfigs() {

        $configPath = __DIR__ . '/../config/lvtags.php';

        $this->publishes([$configPath => config_path('lvtags.php')]);

        $this->mergeConfigFrom($configPath, 'LvTags');
    }

    private function handleTranslations() {

        $this->loadTranslationsFrom(__DIR__.'/../lang', 'lvtags');
    }

    private function handleViews() {

        $this->loadViewsFrom(__DIR__.'/../views', 'lvtags');

        $this->publishes([__DIR__.'/../views' => base_path('resources/views/vendor/lvtags')]);
    }

    private function handleMigrations() {

        $this->publishes([__DIR__ . '/../migrations' => base_path('database/migrations')]);
    }

    private function handleRoutes() {

        include __DIR__.'/../routes.php';
    }
}
