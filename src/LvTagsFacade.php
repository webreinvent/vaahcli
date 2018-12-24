<?php
namespace WebReinvent\LvTags;
use Illuminate\Support\Facades\Facade;


class LvTagsFacade extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'lvtags';
    }
}
