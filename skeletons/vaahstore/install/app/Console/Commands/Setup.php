<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Setup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating Key');
        $this->call('key:generate');

        $this->info('Publishing vendor assets...');
        $this->call('vendor:publish', [
            '--provider' => 'WebReinvent\VaahCms\VaahCmsServiceProvider',
            '--tag' => 'assets',
            '--force' => true
        ]);

        $this->info('Publishing vendor migrations...');
        $this->call('vendor:publish', [
            '--provider' => 'WebReinvent\VaahCms\VaahCmsServiceProvider',
            '--tag' => 'migrations',
            '--force' => true
        ]);

        $this->info('Publishing vendor seeds...');
        $this->call('vendor:publish', [
            '--provider' => 'WebReinvent\VaahCms\VaahCmsServiceProvider',
            '--tag' => 'seeds',
            '--force' => true
        ]);

        $this->info('Publishing vendor config...');
        $this->call('vendor:publish', [
            '--provider' => 'WebReinvent\VaahCms\VaahCmsServiceProvider',
            '--tag' => 'config',
            '--force' => true
        ]);

        $this->info('Running migrations...');
        $this->call('migrate');

        $this->info('Seeding database with VaahCmsTableSeeder...');
        $this->call('db:seed', [
            '--class' => 'WebReinvent\VaahCms\Database\Seeders\VaahCmsTableSeeder'
        ]);

        $this->info('Seeding database with SuperAdminSeeder...');
        $this->call('db:seed', [
            '--class' => 'Database\Seeders\SuperAdminSeeder'
        ]);

        $this->info('Clearing cache...');
        $this->call('cache:clear');

    }
}
