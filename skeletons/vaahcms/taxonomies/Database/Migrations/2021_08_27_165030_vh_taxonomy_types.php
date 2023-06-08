<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VhTaxonomyTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('vh_taxonomy_types')) {
            Schema::create('vh_taxonomy_types', function (Blueprint $table) {

                $table->increments('id');
                $table->uuid()->nullable()->index();
                $table->integer('parent_id')->nullable()->index();
                $table->string('name')->nullable()->index();
                $table->string('slug')->nullable()->index();

                $table->boolean('is_active')->nullable()->index();

                //----common fields
                $table->text('meta')->nullable();
                $table->bigInteger('created_by')->nullable()->index();
                $table->bigInteger('updated_by')->nullable()->index();
                $table->bigInteger('deleted_by')->nullable()->index();
                $table->timestamps();
                $table->softDeletes();
                $table->index(['created_at', 'updated_at', 'deleted_at']);
                //----/common fields

            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vh_taxonomy_types');
    }
}
