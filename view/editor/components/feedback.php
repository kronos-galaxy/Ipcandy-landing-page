<?php

namespace LPCandy\Components;

class Feedback extends Block {
    public $name;
    public $description;
    public $editor = "lp.feedback";
    
    function __construct() { 
        if (self::$en) {
            $this->name = 'Feedback';
            $this->description = "Customer reviews";
        } else {
            $this->name = 'Отзывы';
            $this->description = "Отзывы наших клиентов";
        }        
    }
    
    function tpl($val) {?>
        <div class="container-fluid feedback feedback_1" style="background: <?=$val['background_color']?>;">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <? if ($cls = $this->vis($val['show_title'])): ?>
                            <h1 class="title <?=$cls?> " >
                                <? $this->sub('Text','title',Text::$plain_text) ?>
                            </h1>
                        <? endif ?>
                        <? if ($cls = $this->vis($val['show_title_2'])): ?>
                            <div class="title_2 <?=$cls?> " >
                                <? $this->sub('Text','title_2',Text::$plain_text) ?>
                            </div>
                        <? endif ?>
                        <div class="item_list clear">
                            <? $this->repeat('items',function($item_val,$self) use ($val) { ?>
                                <div class="row">
                                    <? for ($i=1;$i<=3;$i++): ?>                            
                                        <div class="item col-4">
                                            <div class="item_data">
                                                <div class="text">
                                                    <?=$self->sub('Text','text_'.$i,Text::$default_text)?>
                                                </div>
                                                <div class="name">
                                                    <?=$self->sub('Text','name_'.$i,Text::$default_text)?>
                                                </div>
                                                <div class="desc">
                                                    <?=$self->sub('Text','desc_'.$i,Text::$color_text)?>                            
                                                </div>
                                                <? if ($cls = $self->vis($val['show_image'])): ?>
                                                    <div class="img_wrap <?=$cls?>" >
                                                        <? $self->sub('Image','image_'.$i) ?>
                                                    </div>
                                                <? endif ?>
                                            </div>
                                        </div>
                                    <? endfor ?>
                                </div>
                            <? }) ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?}
    
    function tpl_default() { 
        return self::$en ? [
            'show_image' => true,
            'show_title' => true,
            'show_title_2' => false,
            'show_name' => true,
            'show_desc' => true,         
            'background_color' => '#F7F7F7',
            'title' => "Our comments",
            'title_2' => "Subtitle",
            'items' => array(
                array(
                    'image_1' => Configuration::$assets_url."/feedback/1.jpg",
                    'image_2' => Configuration::$assets_url."/feedback/2.jpg",
                    'image_3' => Configuration::$assets_url."/feedback/3.jpg",
                    'name_1' => "Afrosinya Nikonorovna",
                    'name_2' => "Ludwig Aristarkhovich",
                    'name_3' => "Just Kolyan",
                    'desc_1' => "Pensioner",
                    'desc_2' => "Сoncierge",
                    'desc_3' => "Cool guy",
                    'text_1' => "We visited circus with my grandson. A wonderful performance. I like it very much. The artists are fine fellow. With pleasure would have gone more. I am delighted with this circus.",
                    'text_2' => "Thank you to those who did it and director for the wonderful Christmas tree. Especially I liked the dance, the Snow Maiden and her girlfriend.",
                    'text_3' => "Guys with tigers are the best. Super show with the girls in feathers. I liked the performance with a knife. I get satisfaction from watching. I'll go one more time.",
                )
            )
        ] : [
            'show_image' => true,
            'show_title' => true,
            'show_title_2' => false,
            'show_name' => true,
            'show_desc' => true,         
            'background_color' => '#F7F7F7',
            'title' => "Что о нас говорят клиенты",
            'title_2' => "Подзаголовок",
            'items' => array(
                array(
                    'image_1' => Configuration::$assets_url."/feedback/1.jpg",
                    'image_2' => Configuration::$assets_url."/feedback/2.jpg",
                    'image_3' => Configuration::$assets_url."/feedback/3.jpg",
                    'name_1' => "Афросинья Никоноровна",
                    'name_2' => "Людвиг Аристархович",
                    'name_3' => "Прохожий просто Колян",
                    'desc_1' => "Пенсионерка",
                    'desc_2' => "Консьерж",
                    'desc_3' => "Чёткий пацантрэ",
                    'text_1' => "Были в цирке 12 числа с внуком. Замечательное представление. Очень понравилось. Артисты молодцы. С удовольствием пошла бы ещё. Я в восторге от этого цирка.",
                    'text_2' => "Спасибо тому кто это сделал и отдельно режиссёру за прекрасную новогоднюю ёлку. Особенно понравился хоровод, снегурочка и подружки снегурочки.",
                    'text_3' => "Пацаны с тиграми вообще ребята. Супер шоу с девочками в перьях. Заценил номер с ножиками. Получил удовлетворение от просмотра. Ещё разок схожу.",
                )
            )
        ];
    }    
}