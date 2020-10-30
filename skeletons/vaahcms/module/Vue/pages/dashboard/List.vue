<script src="./ListJs.js"></script>
<template>
    <div class="form-page-v1-layout">

        <div class="container" >

            <div class="columns">

                <!--left-->
                <div class="column"
                     :class="{'is-12': page.list_view == 'large',
                     'is-8': page.list_view == 'medium',
                     'is-4': page.list_view == 'small',
                     }">

                    <!--card-->
                    <div class="card" v-if="page.assets && page.list">

                        <!--header-->
                        <div class="card-header">

                            <div class="card-header-title">
                                Content Types
                            </div>

                            <div class="card-header-buttons">
                                <div class="field has-addons is-pulled-right">

                                    <p class="control">
                                        <b-button type="is-light"
                                                  @click="toCreate()"
                                                  icon-left="plus">
                                            Create
                                        </b-button>
                                    </p>
                                    <div class="control">
                                        <b-button type="is-light"
                                                  @click="sync()"
                                                  :loading="is_btn_loading"
                                                  icon-left="redo-alt">
                                        </b-button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!--/header-->

                        <!--content-->
                        <div class="card-content">


                            <div class="block" >



                                <!--actions-->
                                <div class="level">

                                    <!--left-->
                                    <div class="level-left" v-if="page.list_view !='small'">
                                        <div  class="level-item" >
                                            <b-field >

                                                <b-select placeholder="- Bulk Actions -"
                                                          v-model="page.bulk_action.data.status">
                                                    <option value="">
                                                        - Bulk Actions -
                                                    </option>
                                                    <option value=1>
                                                        Active
                                                    </option>
                                                    <option value=0>
                                                        Inactive
                                                    </option>
                                                </b-select>

                                                <p class="control">
                                                    <button class="button is-primary"
                                                            @click="actions">
                                                        Apply
                                                    </button>
                                                </p>

                                            </b-field>
                                        </div>
                                    </div>
                                    <!--/left-->


                                    <!--right-->
                                    <div class="level-right" >

                                        <div class="level-item">

                                            <b-field>

                                                <b-input placeholder="Search"
                                                         type="text"
                                                         icon="search"
                                                         @input="delayedSearch"
                                                         @keyup.enter.prevent="delayedSearch"
                                                         v-model="query_string.q">
                                                </b-input>

                                                <p class="control">
                                                    <button class="button is-primary"
                                                            @click="getList">
                                                        Filter
                                                    </button>
                                                </p>
                                                <p class="control">
                                                    <button class="button is-primary"
                                                            @click="resetPage">
                                                        Reset
                                                    </button>
                                                </p>
                                                <p class="control">
                                                    <button class="button is-primary"
                                                            @click="toggleFilters()"
                                                            slot="trigger">
                                                        <b-icon icon="ellipsis-v"></b-icon>
                                                    </button>
                                                </p>
                                            </b-field>

                                        </div>

                                    </div>
                                    <!--/right-->

                                </div>
                                <!--/actions-->

                                <!--filters-->
                                <div class="level" v-if="page.show_filters">

                                    <div class="level-left">



                                        <div class="level-item">

                                            <b-field label="">
                                                <b-select placeholder="- Select a filter -"
                                                          v-model="query_string.filter"
                                                          @input="setFilter()">
                                                    <option value="">
                                                        - Select a filter -
                                                    </option>
                                                    <optgroup label="Status">
                                                        <option value=01>
                                                            Active
                                                        </option>
                                                        <option value=10>
                                                            Inactive
                                                        </option>
                                                    </optgroup>

                                                    <optgroup label="Module">
                                                        <option
                                                            v-for="option in page.assets.module"
                                                            :value="option.module"
                                                            :key="option.module">
                                                            {{  option.module.charAt(0).toUpperCase() + option.module.slice(1) }}
                                                        </option>
                                                    </optgroup>
                                                </b-select>

                                                <b-select placeholder="- Select a section -"
                                                          v-if="page.assets.module.some(item => item.module === query_string.filter)"
                                                          v-model="query_string.section"
                                                          @input="getList()">
                                                    <option value="">
                                                        - Select a section -
                                                    </option>
                                                    <option
                                                        v-for="option in moduleSection"
                                                        :value="option.section"
                                                        :key="option.section">
                                                        {{  option.section.charAt(0).toUpperCase() + option.section.slice(1) }}
                                                    </option>
                                                </b-select>
                                            </b-field>


                                        </div>

                                        <div class="level-item">
                                            <div class="field">
                                                <b-checkbox v-model="query_string.trashed"
                                                            @input="getList"
                                                >
                                                    Include Trashed
                                                </b-checkbox>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="level-right">

                                        <div class="level-item">

                                            <b-field>
                                                <b-datepicker
                                                    position="is-bottom-left"
                                                    placeholder="- Select a dates -"
                                                    v-model="selected_date"
                                                    @input="setDateRange"
                                                    range>
                                                </b-datepicker>
                                            </b-field>


                                        </div>

                                    </div>


                                </div>
                                <!--/filters-->


                                <!--list-->
                                <div class="block ">

                                    <div class="block" style="margin-bottom: 0px;" >

                                        <div v-if="page.list_view == 'small'">
                                            <ListSmallView/>
                                        </div>

                                        <div v-else-if="page.list_view == 'medium'">
                                            <ListLargeView/>
                                        </div>

                                        <div v-else>
                                            <ListLargeView/>
                                        </div>

                                    </div>

                                    <hr style="margin-top: 0;"/>

                                    <div class="block" v-if="page.list">
                                        <vh-pagination  :limit="1" :data="page.list"
                                                        @onPageChange="paginate">
                                        </vh-pagination>
                                    </div>

                                </div>
                                <!--/list-->



                            </div>


                        </div>
                        <!--/content-->

                    </div>
                    <!--/card-->


                </div>
                <!--/left-->

                <router-view @eReloadList="getList"></router-view>

            </div>


        </div>

    </div>
</template>


