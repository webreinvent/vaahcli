<script src="./ContentStructureJs.js"></script>
<template>
    <div class="column" v-if="assets && item">

        <div class="columns">

            <div class="column">

                <div class="card">

                    <!--header-->
                    <header class="card-header">

                        <div class="card-header-title">
                            <span>Content Structure</span>
                        </div>


                        <div class="card-header-buttons">

                            <div class="field has-addons is-pulled-right">

                                <p class="control">
                                    <b-button icon-left="save"
                                              type="is-light"
                                              :loading="is_btn_loading"
                                              @click="storeGroups()">
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
                    <div class="card-content"  style="max-height: 600px; overflow: auto;">


                        <div class="card" v-if="item.groups.length > 0"
                             v-for="(group,index) in item.groups">

                            <div class="card-header">

                                <div class="card-header-title">
                                    <span>{{group.name}}</span>
                                </div>

                                <div class="card-header-buttons">

                                    <b-field>

                                        <b-switch >
                                            Is repeatable
                                        </b-switch>



                                    </b-field>


                                </div>

                                <div class="card-header-buttons">
                                    <b-field>
                                        <p class="control">
                                            <b-tooltip label="Copy Slug" type="is-dark">
                                                <b-button @click="$vaah.copy(group.slug)"
                                                >#{{group.id}}</b-button>
                                            </b-tooltip>
                                        </p>
                                        <p class="control">
                                            <b-button>Edit</b-button>
                                        </p>
                                        <p class="control">
                                            <b-tooltip label="Delete Group" type="is-dark">
                                                <b-button @click="deleteGroup(group, index)" icon-left="trash">
                                                </b-button>
                                            </b-tooltip>
                                        </p>


                                    </b-field>
                                </div>


                            </div>

                            <div class="card-content is-paddingless">

                                <div class="draggable" >
                                    <draggable class="dropzone" :list="group.fields"
                                               :group="{name:'fields'}">
                                        <div v-if="group.fields.length>0"
                                             v-for="(field, f_index) in group.fields"
                                             :key="f_index">
                                            <div class="dropzone-field">
                                                <b-field class="is-marginless" >
                                                    <p class="control drag">
                                                        <span class="button is-static">:::</span>
                                                    </p>

                                                    <p class="control " v-if="field.type">
                                                        <span class="button dropzone-field-label is-static">
                                                            {{field.type.name}}
                                                        </span>
                                                    </p>
                                                    <b-input v-model="field.name" expanded placeholder="Field Name">
                                                    </b-input>
                                                    <p class="control">
                                                        <b-tooltip label="Copy Slug" type="is-dark">
                                                            <b-button @click="$vaah.copy(field.slug)"
                                                            >#{{field.id}}</b-button>
                                                        </b-tooltip>
                                                    </p>

                                                    <p class="control">
                                                        <b-tooltip label="Field Option" type="is-dark">
                                                            <b-button icon-left="cog"
                                                                      @click="toggleFieldOptions($event)"></b-button>
                                                        </b-tooltip>
                                                    </p>

                                                    <p class="control">
                                                        <b-tooltip label="Delete Field" type="is-dark">
                                                            <b-button @click="deleteGroupField(group, f_index)"
                                                                      icon-left="trash"></b-button>
                                                        </b-tooltip>
                                                    </p>

                                                </b-field>
                                                <div class="dropzone-field-options ">

                                                    <table class="table">
                                                        <tr>
                                                            <td width="180" >
                                                                Is repeatable
                                                            </td>
                                                            <td>
                                                                <b-switch v-model="field.is_repeatable"
                                                                          type="is-success">
                                                                </b-switch>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td width="180" >
                                                                Is searchable
                                                            </td>
                                                            <td>
                                                                <b-switch v-model="field.is_searchable"
                                                                          type="is-success">
                                                                </b-switch>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td >
                                                                Excerpt
                                                            </td>
                                                            <td>
                                                                <b-input maxlength="200" v-model="field.excerpt"
                                                                         type="textarea"></b-input>
                                                            </td>
                                                        </tr>

                                                        <template v-if="field.meta">
                                                            <tr v-for="(meta_item, meta_index) in field.meta">
                                                                <td v-html="$vaah.toLabel(meta_index)">
                                                                </td>
                                                                <td>
                                                                    <div v-if="meta_index == 'is_hidden'">
                                                                        <b-checkbox v-model="field.meta[meta_index]">Is Hidden</b-checkbox>
                                                                    </div>
                                                                    <div v-else>
                                                                        <b-input v-model="field.meta[meta_index]"
                                                                                 type="text"></b-input>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </template>

                                                    </table>



                                                </div>
                                                </div>
                                        </div>

                                    </draggable>
                                </div>


                            </div>


                        </div>




                    </div>
                    <!--/content-->

                    <div class="card-footer">
                        <div class="card-footer-item">
                            <b-field >
                                <b-input v-model="new_group.name"
                                         @keyup.enter.native="addNewGroup"
                                         type="text"></b-input>
                                <p class="control">
                                    <b-button @click="addNewGroup"
                                    >
                                        Add Group
                                    </b-button>
                                </p>
                            </b-field>
                        </div>
                    </div>




                </div>

            </div>
            <div class="column is-3" >

                <div class="card">

                    <!--header-->
                    <header class="card-header">

                        <div class="card-header-title">
                            <span>Content Fields</span>

                        </div>


                    </header>
                    <!--/header-->

                    <!--content-->
                    <div class="card-content" style="max-height: 600px; overflow: auto;"
                         v-if="assets && assets.field_types">



                        <div class="draggable" >
                            <draggable :list="assets.field_types"
                                       :clone="cloneField"
                                       :group="{name:'fields', pull:'clone', put:false}"
                                       >

                                <div v-for="(field, index) in assets.field_types"
                                     :key="index">
                                    <b-field class="has-margin-bottom-5" expanded>
                                        <p class="control drag">
                                            <span class="button is-static">:::</span>
                                        </p>

                                        <p class="control drag">
                                            <span class="button is-static">{{field.name}}</span>
                                        </p>
                                    </b-field>

                                </div>

                            </draggable>
                        </div>

                    </div>
                    <!--/content-->





                </div>

            </div>


        </div>




    </div>
</template>
