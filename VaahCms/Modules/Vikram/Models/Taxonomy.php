<?php namespace VaahCms\Modules\Vikram\Models;

use WebReinvent\VaahCms\Models\Taxonomy as TaxonomyBase;

class Taxonomy extends TaxonomyBase
{
  protected $table = 'vh_taxonomies';

  protected $fillable = [
    'uuid','parent_id','vh_taxonomy_type_id',
    'name','slug', 'excerpt','details',
    'notes','is_active','meta',
    'created_by','updated_by','deleted_by',
  ];

  //-------------------------------------------------

  //-------------------------------------------------
  //-------------------------------------------------

}
