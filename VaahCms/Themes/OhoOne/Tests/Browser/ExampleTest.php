<?php namespace VaahCms\Theme\OhoOne\Tests\Browser;

use VaahCms\Theme\OhoOne\Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ExampleTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->browse(function (Browser $browser) {
            $this->browse(function (Browser $browser) {
                $browser->maximize();
                $browser->visit('/')
                    ->assertSee('OhoOne');
            });
        });
    }
}
