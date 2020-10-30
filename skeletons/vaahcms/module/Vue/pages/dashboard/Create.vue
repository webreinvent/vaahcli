<script src="./CreateJs.js"></script>
<template>
    <div class="column" v-if="page.assets">

        <div class="card">

            <!--header-->
            <header class="card-header">

                <div class="card-header-title">
                    <span>Create New Content Type</span>
                </div>


                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">

                        <p class="control">
                            <b-button icon-left="save"
                                      type="is-light"
                                      :loading="is_btn_loading"
                                      @click="create()">
                                Save
                            </b-button>
                        </p>



                        <p class="control">
                            <b-button tag="router-link"
                                      type="is-light"
                                      :to="{name: 'content.types.list'}"
                                      icon-left="times">
                            </b-button>
                        </p>



                    </div>


                </div>

            </header>
            <!--/header-->

            <!--content-->
            <div class="card-content">
                <div class="block">

                    <b-field label="Name" :label-position="labelPosition">
                        <b-input v-model="new_item.name"></b-input>
                    </b-field>

                    <b-field label="Slug" :label-position="labelPosition">
                        <b-input v-model="new_item.slug"></b-input>
                    </b-field>

                    <b-field label="Content Plural Name" :label-position="labelPosition">
                        <b-input v-model="new_item.plural"></b-input>
                    </b-field>

                    <b-field label="Content Plural Slug" :label-position="labelPosition">
                        <b-input v-model="new_item.plural_slug"></b-input>
                    </b-field>

                    <b-field label="Content Singular Name" :label-position="labelPosition">
                        <b-input v-model="new_item.singular"></b-input>
                    </b-field>

                    <b-field label="Content Singular Slug" :label-position="labelPosition">
                        <b-input v-model="new_item.singular_slug"></b-input>
                    </b-field>

                    <b-field label="Excerpt" :label-position="labelPosition">
                        <b-input type="textarea"
                                 maxlength="200"
                                 v-model="new_item.excerpt"></b-input>
                    </b-field>

                    <b-field label="Is Published" :label-position="labelPosition">
                        <b-radio-button v-model="new_item.is_published"
                                        :native-value=1>
                            <span>Yes</span>
                        </b-radio-button>

                        <b-radio-button type="is-danger"
                                        v-model="new_item.is_published"
                                        :native-value=0>
                            <span>No</span>
                        </b-radio-button>
                    </b-field>

                    <b-field label="Is Comments Allowed" :label-position="labelPosition">
                        <b-radio-button v-model="new_item.is_commentable"
                                        :native-value=1>
                            <span>Yes</span>
                        </b-radio-button>

                        <b-radio-button type="is-danger"
                                        v-model="new_item.is_commentable"
                                        :native-value=0>
                            <span>No</span>
                        </b-radio-button>
                    </b-field>


                    <b-field label="List Statuses" :label-position="labelPosition">

                        <div class="draggable">
                            <draggable v-model="new_item.content_statuses"
                                       group="content_statuses"
                                       >

                                    <div v-for="(status, index) in new_item.content_statuses"
                                         :key="index">


                                        <b-field class="has-margin-bottom-5" expanded>
                                            <p class="control drag">
                                                <span class="button is-static">:::</span>
                                            </p>

                                            <b-input v-model="new_item.content_statuses[index]"
                                                     v-if="index == edit_status_index && !disable_status_editing"
                                                     expanded></b-input>

                                            <b-input v-model="new_item.content_statuses[index]"
                                                     v-else
                                                     disabled
                                                     expanded></b-input>


                                            <p class="control">
                                                <b-button
                                                          @click="toggleEditStatus(index)"
                                                          icon-left="edit">
                                                </b-button>
                                            </p>
                                        </b-field>



                                    </div>

                            </draggable>
                        </div>




                    </b-field>

                    <b-field label="New Status" :label-position="labelPosition">
                        <b-input type="text" v-model="new_status"
                                 placeholder="Type new status and press enter"
                                 @keyup.enter.native="addStatus()"></b-input>
                    </b-field>

                </div>
            </div>
            <!--/content-->





        </div>




    </div>
</template>
