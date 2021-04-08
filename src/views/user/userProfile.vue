<template>
  <div>
    <sidebar />
    <br />
    <div class="contents md:hidden relative">
      <div class="altaraBlue">
        <div class="flex justify-around">
          <div
            v-if="customer.name"
            :style="{ background: generateRandomColor() }"
            class="text-center text-white text-7xl rounded-full my-11 h-32 w-32 flex items-center justify-center"
          >
            {{ customer ? customer.name[0].toUpperCase() : "" }}
          </div>
        </div>
        <div class="mb-6 text-center text-xl text-white text-3xl text-white">
          {{ customer ? customer.name : "" }}
        </div>
        <div class="flex flex-wrap">
          <div class="w-full mx-2">
            <ul class="flex mb-0 list-none flex-wrap pt-3 flex-row">
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                  v-on:click="toggleTabs(1)"
                  v-bind:class="{
                    'text-white': openTab !== 1,
                    'bg-white': openTab === 1
                  }"
                >
                  Basic Info
                </a>
              </li>
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                  v-on:click="toggleTabs(2)"
                  v-bind:class="{
                    'text-white': openTab !== 2,
                    'bg-white': openTab === 2
                  }"
                >
                  Feedbacks
                </a>
              </li>
              <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                  v-on:click="toggleTabs(3)"
                  v-bind:class="{
                    'text-white': openTab !== 3,
                    ' bg-white': openTab === 3
                  }"
                >
                  Todo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="relative flex flex-col min-w-0 break-words w-full mx-2">
        <div class="py-5 flex-auto">
          <div class="tab-content tab-space">
            <div
              v-bind:class="{
                hidden: openTab !== 1,
                block: openTab === 1
              }"
            >
              <div
                v-if="editMode"
                class="space-y-4 px-5 bg-white mt-5 rounded-lg shadow-xl"
              >
                <form>
                  <h6
                    class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase"
                  ></h6>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          v-model="customer.email"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          :class="[error.email ? 'is-invalid' : '']"
                        />
                        <small
                          class="error-control"
                          v-if="errors.first('email')"
                        >
                          {{ errors.first("email") }}
                        </small>
                        <small class="error-control" v-if="error.email">{{
                          error.email[0]
                        }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          v-validate="'required'"
                          name="phone"
                          v-model="customer.phone"
                          :class="[
                            errors.first('phone') || error.phone
                              ? 'is-invalid'
                              : ''
                          ]"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                        <small
                          class="error-control"
                          v-if="errors.first('phone')"
                        >
                          {{ errors.first("phone") }}
                        </small>
                        <small class="error-control" v-if="error.phone">{{
                          error.phone[0]
                        }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Employment Status
                        </label>

                        <select
                          v-model="customer.employment_status_id"
                          v-validate="'required'"
                          name="employment status"
                          :class="[
                            errors.first('employment status') ||
                            error.employment_status_id
                              ? 'is-invalid'
                              : ''
                          ]"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option disabled selected="selected">
                            Select Employment Status
                          </option>
                          <option
                            :value="type.id"
                            :key="type.id"
                            v-for="type in employmentStatusList"
                          >
                            {{ type.name }}
                          </option>
                        </select>
                        <small
                          class="error-control"
                          v-if="errors.first('employment status')"
                        >
                          {{ errors.first("employment status") }}
                        </small>
                        <small
                          class="error-control"
                          v-if="error.employment_status_id"
                          >{{ error.employment_status_id[0] }}</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-12/12">
                    <div class="relative w-full py-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Customer Stage
                      </label>

                      <select
                        v-model="customer.customer_stage_id"
                        v-validate="'required'"
                        name="customer stage"
                        :class="[
                          errors.first('customer stage') ||
                          error.customer_stage_id
                            ? 'is-invalid'
                            : ''
                        ]"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      >
                        <option disabled selected="selected">
                          Selecet Customer Stage
                        </option>
                        <option
                          :value="type.id"
                          :key="type.id"
                          v-for="type in customerStages"
                        >
                          {{ type.name }}
                        </option>
                      </select>
                      <small
                        class="error-control"
                        v-if="errors.first('employment status')"
                      >
                        {{ errors.first("employment status") }}
                      </small>
                      <small
                        class="error-control"
                        v-if="error.employment_status_id"
                        >{{ error.employment_status_id[0] }}</small
                      >
                    </div>
                  </div>
                </form>
              </div>

              <div
                v-else
                class="space-y-4 px-5 bg-white mt-5 rounded-lg shadow-xl"
              >
                <div class="flow-root">
                  <div class="my-3">
                    <b>Reg ID: </b> {{ customer.reg_id || "" }}
                  </div>
                </div>

                <div class="flow-root">
                  <div class="my-3"><b>Phone: </b> {{ customer.phone }}</div>
                </div>
                <div class="flow-root">
                  <div class="my-3"><b>Email: </b> {{ customer.email }}</div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Employment Status: </b>
                    {{ employmentStatus || "N/A" }}
                  </div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Customer Stage: </b>
                    {{ customerStage || "N/A" }}
                  </div>
                </div>
                <div v-if="customer.users" class="flow-root">
                  <div class="my-3">
                    <b>Feedbacks: </b>{{ customer.users.full_name }}
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto">
                <button
                  v-if="editMode"
                  @click="updateUser(customer)"
                  class="bg-white mt-5 altaraBlueText font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <i class="mr-2 fas fa-check"></i>
                  <span>Save</span>
                </button>

                <button
                  v-else
                  @click="editSwitch(true)"
                  class="bg-white mt-5 altaraBlueText font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <i class="mr-2 far fa-edit"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
            <div
              v-bind:class="{
                hidden: openTab !== 2,
                block: openTab === 2
              }"
              class="px-5"
            >
              <div
                v-on:click="logFeedbackPopup()"
                class="absolute altaraBlue text-white bottom-0 right-5 text-2xl w-14 h-14 rounded-full flex items-center justify-center"
              >
                +
              </div>
              <div
                :key="index"
                v-for="(data, index) in customer.feedback"
                class="chatBox"
              >
                <div v-on:click="openPopup(data)" class="flex justify-between">
                  <div class="self-center w-70 truncate">
                    {{ data.notes }}
                  </div>
                  <div class="font-light text-xs">
                    {{ data.created || "Not Available" }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-bind:class="{
                hidden: openTab !== 3,
                block: openTab === 3
              }"
            >
              <div
                v-on:click="logTodoPopup()"
                class="absolute altaraBlue text-white bottom-10 right-5 text-2xl w-14 h-14 rounded-full flex items-center justify-center"
              >
                +
              </div>
              <div class="mx-5">
                <div :key="index" v-for="(data, index) in todos" class="">
                  <div class="customerTile">
                    <div class="flex justify-between">
                      <div class="flex items-stretch">
                        <div class="self-center font-medium">
                          {{ data.todo || "" }}
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <div class="avatarCircle">
                          <input
                            @change="checkTodo(data)"
                            type="checkbox"
                            class="form-checkbox h-5 w-5 text-gray-600"
                            :checked="data.status === 'done' ? true : false"
                          />
                        </div>
                        <div class="text-xs">
                          {{ data.due_date || "Not Available" }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden md:contents bg-white relative">
      <div class="md:ml-56">
        <div class="px-4 md:px-10">
          <div class="flex flex-wrap">
            <div
              class="w-full md:w-4/12 altaraBlue w-full shadow-lg rounded p-4"
            >
              <div
                v-if="customer.name"
                :style="{ background: generateRandomColor() }"
                class="text-center text-white text-7xl rounded-full mt-11 mb-4 h-32 w-32 flex items-center justify-center mx-auto"
              >
                {{ customer.name[0].toUpperCase() || "" }}
              </div>
              <h2 class="text-xl font-bold text-center text-white">
                {{ customer.name || "" }}
              </h2>

              <div
                v-if="editMode"
                class="space-y-4 px-5 bg-white mt-5 rounded-lg shadow-xl"
              >
                <form>
                  <h6
                    class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase"
                  ></h6>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          v-model="customer.email"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          :class="[error.email ? 'is-invalid' : '']"
                        />
                        <small
                          class="error-control"
                          v-if="errors.first('email')"
                        >
                          {{ errors.first("email") }}
                        </small>
                        <small class="error-control" v-if="error.email">{{
                          error.email[0]
                        }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          v-validate="'required'"
                          name="phone"
                          v-model="customer.phone"
                          :class="[
                            errors.first('phone') || error.phone
                              ? 'is-invalid'
                              : ''
                          ]"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                        <small
                          class="error-control"
                          v-if="errors.first('phone')"
                        >
                          {{ errors.first("phone") }}
                        </small>
                        <small class="error-control" v-if="error.phone">{{
                          error.phone[0]
                        }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Employment Status
                        </label>

                        <select
                          v-model="customer.employment_status_id"
                          v-validate="'required'"
                          name="employment status"
                          :class="[
                            errors.first('employment status') ||
                            error.employment_status_id
                              ? 'is-invalid'
                              : ''
                          ]"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option disabled selected="selected">
                            Selecet Employment Status
                          </option>
                          <option
                            :value="type.id"
                            :key="type.id"
                            v-for="type in employmentStatusList"
                          >
                            {{ type.name }}
                          </option>
                        </select>
                        <small
                          class="error-control"
                          v-if="errors.first('employment status')"
                        >
                          {{ errors.first("employment status") }}
                        </small>
                        <small
                          class="error-control"
                          v-if="error.employment_status_id"
                          >{{ error.employment_status_id[0] }}</small
                        >
                      </div>
                    </div>
                    <div class="w-full lg:w-12/12">
                      <div class="relative w-full py-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Customer Stage
                        </label>

                        <select
                          v-model="customer.customer_stage_id"
                          v-validate="'required'"
                          name="customer stage"
                          :class="[
                            errors.first('customer stage') ||
                            error.customer_stage_id
                              ? 'is-invalid'
                              : ''
                          ]"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        >
                          <option disabled selected="selected">
                            Selecet Customer Stage
                          </option>
                          <option
                            :value="type.id"
                            :key="type.id"
                            v-for="type in customerStages"
                          >
                            {{ type.name }}
                          </option>
                        </select>
                        <small
                          class="error-control"
                          v-if="errors.first('employment status')"
                        >
                          {{ errors.first("employment status") }}
                        </small>
                        <small
                          class="error-control"
                          v-if="error.employment_status_id"
                          >{{ error.employment_status_id[0] }}</small
                        >
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div
                v-else
                class="space-y-4 px-5 bg-white mt-5 rounded-lg shadow-xl"
              >
                <div class="flow-root">
                  <div class="my-3">
                    <b>Reg ID: </b> {{ customer.reg_id || "" }}
                  </div>
                </div>

                <div class="flow-root">
                  <div class="my-3"><b>Phone: </b> {{ customer.phone }}</div>
                </div>
                <div class="flow-root">
                  <div class="my-3"><b>Email: </b> {{ customer.email }}</div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Employment Status: </b>
                    {{ employmentStatus || "N/A" }}
                  </div>
                </div>
                <div class="flow-root">
                  <div class="my-3">
                    <b>Customer Stage: </b>
                    {{ customerStage || "N/A" }}
                  </div>
                </div>
                <div v-if="customer.users" class="flow-root">
                  <div class="my-3">
                    <b>Feedbacks: </b>{{ customer.users.full_name }}
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-center mx-auto">
                <button
                  v-if="editMode"
                  @click="updateUser(customer)"
                  class="bg-white mt-5 altaraBlueText font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <i class="mr-2 fas fa-check"></i>
                  <span>Save</span>
                </button>

                <button
                  v-else
                  @click="editSwitch(true)"
                  class="bg-white mt-5 altaraBlueText font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <i class="mr-2 far fa-edit"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>

            <div
              class="w-full overflowTest h-screen md:w-8/12 bg-white w-full shadow-lg rounded p-4"
            >
              <div class="flex flex-wrap">
                <div class="w-full pointer mx-2">
                  <ul
                    class="flex mb-0 list-none flex-wrap pt-3 flex-row border-b-2 border-gray-600 mb-5"
                  >
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                        v-on:click="toggleBigTabs(1)"
                        v-bind:class="{
                          altaraBlueText: openBigTab !== 1,
                          'altaraBlue text-white': openBigTab === 1
                        }"
                      >
                        Feedbacks
                      </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        class="text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
                        v-on:click="toggleBigTabs(2)"
                        v-bind:class="{
                          altaraBlueText: openBigTab !== 2,
                          'altaraBlue text-white': openBigTab === 2
                        }"
                      >
                        Todo
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class=" ">
                <div
                  v-bind:class="{
                    hidden: openBigTab !== 1,
                    block: openBigTab === 1
                  }"
                >
                  <div
                    v-on:click="logFeedbackPopup()"
                    class="absolute altaraBlue text-white bottom-10 right-5 text-2xl w-14 h-14 rounded-full flex items-center justify-center"
                  >
                    +
                  </div>
                  <div
                    :key="index"
                    v-for="(data, index) in customer.feedback"
                    class="chatBox"
                  >
                    <div
                      v-on:click="openPopup(data.notes)"
                      class="flex justify-between"
                    >
                      <div class="flex">
                        <div class="space0"></div>
                        <div class="self-center w-80 truncate">
                          <h2 class="font-bold">
                            {{ data.reason === null ? "" : data.reason.reason }}
                          </h2>
                          {{ data.notes }}
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <div class="font-light text-xs">
                          {{ data.created_at.split("T")[0] || "Not Available" }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="customer.feedback && !customer.feedback.length"
                    class="chatBox"
                  >
                    No Feedbacks Available
                  </div>
                </div>
              </div>
              <div
                v-bind:class="{
                  hidden: openBigTab !== 2,
                  block: openBigTab === 2
                }"
              >
                <div
                  v-on:click="logTodoPopup()"
                  class="absolute altaraBlue text-white bottom-10 right-5 text-2xl w-14 h-14 rounded-full flex items-center justify-center"
                >
                  +
                </div>
                <div class="mx-5">
                  <div :key="index" v-for="(data, index) in todos" class="">
                    <div class="customerTile">
                      <div class="flex justify-between">
                        <div class="flex items-stretch">
                          <div class="self-center font-medium">
                            {{ data.todo || "" }}
                          </div>
                        </div>
                        <div class="flex flex-col">
                          <div class="avatarCircle">
                            <input
                              @change="checkTodo(data)"
                              type="checkbox"
                              class="form-checkbox h-5 w-5 text-gray-600"
                              :checked="data.status === 'done' ? true : false"
                            />
                          </div>
                          <div class="text-xs">
                            {{ data.due_date || "Not Available" }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="todos.length === 0" class="chatBox">
                    No Todos Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <div v-if="feedbackPopup" id="overlay" v-on:click="closePopup()">
      <div class="flex items-center justify-center bottom-0 w-full h-full">
        <div
          @click.stop
          class="bg-white rounded-lg w-full md:ml-56 m-8 py-4 md:w-6/12 sm:w-8/12 h-350-px"
        >
          <div class="relative w-full px-4 max-w-full flex justify-between">
            <h3 class="font-semibold text-base text-gray-800">
              {{ customer.name || "" }} - Feedbacks
            </h3>
            <i class="fas fa-times-circle" v-on:click="closePopup()"></i>
          </div>
          <br />
          <div class="px-4 h-290-px overflow-x-auto">
            {{ message }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="logFeedbackPopupValue"
      v-on:click="closeFeedbackPopup()"
      id="overlay"
    >
      <div class="flex items-center justify-center bottom-0 h-full">
        <div
          @click.stop
          class="bg-white rounded-lg md:ml-56 m-8 py-4 md:w-6/12 sm:w-8/12 h-350-px"
        >
          <div class="relative px-4 flex justify-between">
            <h3 class="font-semibold text-base text-gray-800">
              {{ customer.name || "" }} - Log Feedback
            </h3>
            <i
              class="fas fa-times-circle"
              v-on:click="closeFeedbackPopup()"
            ></i>
          </div>
          <br />
          <div class="px-4 w-full">
            <div class="relative w-50 mb-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Reason
              </label>
              <select
                v-model="customer.reason"
                name="employment status"
                class="mx-input"
              >
                <option disabled selected="selected">Select reason</option>
                <option :value="type.id" :key="type.id" v-for="type in reasons">
                  {{ type.reason || "" }}
                </option>
              </select>
            </div>
          </div>
          <div class="px-4 h-290-px overflow-x-auto">
            <textarea
              rows="8"
              cols="40"
              type="text"
              name="feedback"
              placeholder="Enter Feedback..."
              v-validate="'required'"
              :class="[
                errors.first('feedback') || error.feedback
                  ? 'is-invalid'
                  : 'border'
              ]"
              v-model="customer.notes"
            />
            <br />
            <small class="error-control" v-if="errors.first('feedback')">
              {{ errors.first("feedback") }}
            </small>
            <small class="error-control" v-if="error.feedback">{{
              error.feedback[0]
            }}</small>
            <br /><br />
            <button
              v-on:click="postFeedbackComment(customer)"
              class="altaraBlue rounded h-10 mt-6 px-3 text-white"
            >
              Log Feedback
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="logTodoPopupValue" id="overlay" v-on:click="closeTodoPopup()">
      <div class="flex items-center justify-center bottom-0 h-full">
        <div
          @click.stop
          class="bg-white rounded-lg md:ml-56 m-8 py-4 md:w-6/12 sm:w-8/12 h-350-px"
        >
          <div class="relative px-4 flex justify-between">
            <h3 class="font-semibold text-base text-gray-800">
              {{ customer.name || "" }} - Log Todo
            </h3>
            <i class="fas fa-times-circle" v-on:click="closeTodoPopup()"></i>
          </div>
          <br />
          <div class="px-4 h-290-px overflow-x-auto">
            <div class="flex justify-between">
              <div class="w-full lg:w-4/12 xl:w-3/12">
                <div class="relative mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Due Date
                  </label>
                  <div>
                    <date-picker
                      valueType="format"
                      v-model="customer.due_date"
                    ></date-picker>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-4/12 xl:w-3/12">
                <div class="relative mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Type
                  </label>
                  <div>
                    <input
                      type="text"
                      v-validate="'required'"
                      name="type"
                      v-model="customer.type"
                      :class="[
                        errors.first('type') || error.type ? 'is-invalid' : ''
                      ]"
                      class="mx-input"
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="w-full lg:w-4/12 xl:w-3/12">
                <div class="relative mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Status
                  </label>
                  <div>
                    <input
                      type="text"
                      name="status"
                      v-model="customer.status"
                      :class="[
                        errors.first('status') || error.status
                          ? 'is-invalid'
                          : '',
                      ]"
                      class="mx-input"
                    />
                  </div>
                </div>
              </div> -->
            </div>
            <textarea
              rows="8"
              cols="40"
              type="text"
              name="todo"
              placeholder="Enter todo..."
              v-validate="'required'"
              :class="[
                errors.first('todo') || error.todo ? 'is-invalid' : 'border'
              ]"
              v-model="customer.todo"
            />
            <br />
            <small class="error-control" v-if="errors.first('todo')">
              {{ errors.first("todo") }}
            </small>
            <small class="error-control" v-if="error.todo">{{
              error.todo[0]
            }}</small>
            <br /><br />
            <button
              v-on:click="postTodoComment(customer)"
              class="altaraBlue rounded h-10 mt-6 px-3 text-white"
            >
              Log Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import avatar from "@/assets/img/avatar.png";
import { get, post, put } from "@/utilities/api";
import DatePicker from "vue2-datepicker";
import queryParam from "../../utilities/queryParam";

export default {
  name: "UserProfile",

  components: {
    Sidebar,
    HeaderStats,
    DatePicker
  },
  data() {
    return {
      avatar,
      pageNumber: 1,
      searchQuery: {},
      searchFilter: {},
      usersList: [],
      employmentStatus: "",
      customerStage: "",
      comments: [],
      message: "",
      prev_page_url: "",
      next_page_url: "",
      apiUrls: {
        getEmploymentStatus: `/api/employment_status`,
        getusersList: `/api/customer_contact`,
        getStage: `/api/customer_stage`,
        postComment: `/api/feedback`,
        postTodo: `/api/todo`,
        updateUser: `/api/customer_contact/`,
        reasons: `/api/reason`
      },
      feedback: "",
      openTab: 1,
      customer: {},
      openBigTab: 1,
      feedbackModal: false,
      feedbackPopup: false,
      logFeedbackPopupValue: false,
      logTodoPopupValue: false,
      error: {},
      editMode: false,
      employmentStatusList: [],
      todos: [],
      reasons: [],
      customerStages: [],
      todo: {}
    };
  },
  async created() {
    // if (!this.customer) {
    //   return this.$router.push({
    //     name: "admin",
    //   });
    // }
    await this.searchUsersList(this.$route.params.id);
    await this.getEmploymentStatus();
    await this.getUserStage();
    await this.getTodos();

    await this.getReasons();
  },
  methods: {
    checkTodo(data) {
      this.$LIPS(true);
      put(this.apiUrls.postTodo + "/" + data.id, {
        status: data.status === "done" ? "not done" : "done"
      })
        .then(() => {
          this.$LIPS(false);
          this.$swal({
            icon: "success",
            title: "Todo Updated Successfully"
          });
          this.getTodos();
        })

        .catch(({ response: { data } }) => {
          const errData = data.data.errors;
          this.error = errData ? errData : data;

          this.$LIPS(false);
        });
    },
    nextPage() {
      this.pageNumber++;
      this.searchUsersList();
    },
    prevPage() {
      this.pageNumber--;
      this.searchUsersList();
    },
    async getEmploymentStatus() {
      try {
        const fetchEmploymentStatus = await get(
          this.apiUrls.getEmploymentStatus
        );
        this.employmentStatusList = fetchEmploymentStatus.data.data;
        this.employmentStatus = this.employmentStatusList.find(
          x => x.id === this.customer.employment_status_id
        ).name;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getReasons() {
      try {
        const fetchReasons = await get(this.apiUrls.reasons);
        this.reasons = fetchReasons.data.reasons;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getTodos() {
      try {
        const query = {
          customer: this.customer.id,
          user: localStorage.getItem("user_id")
        };

        const fetchTodos = await get(this.apiUrls.postTodo + queryParam(query));
        this.todos = fetchTodos.data.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async getUserStage() {
      try {
        const fetchUserStage = await get(this.apiUrls.getStage);
        this.customerStages = fetchUserStage.data.data;
        this.customerStage = fetchUserStage.data.data.find(
          x => x.id === this.customer.customer_stage_id
        ).name;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
    async editSwitch(data) {
      this.editMode = data;
    },
    async updateUser(customer) {
      const userInfo = {
        phone: customer.phone,
        employment_status_id: customer.employment_status_id,
        email: customer.email,
        customer_stage_id: customer.customer_stage_id
      };
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.$LIPS(true);
            this.error = {};
            put(this.apiUrls.updateUser + this.customer.id, {
              ...userInfo
            })
              .then(() => {
                this.$LIPS(false);
                this.$swal({
                  icon: "success",
                  title: "User Updated Successfully"
                });
                this.editMode = false;
              })

              .catch(({ response: { data } }) => {
                const errData = data.data.errors;
                this.error = errData ? errData : data;

                this.$LIPS(false);
              });
          }
        })
        .catch(e => {});
    },
    async getUsersList() {
      this.$LIPS(true);

      try {
        const fetchusersList = await get(this.apiUrls.getusersList);
        this.usersList = fetchusersList.data.data.data;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
      }
    },
    resetSearch() {
      this.searchQuery = {};
    },
    async searchUsersList(data) {
      this.$LIPS(true);

      try {
        // const query = { id: data };
        const fetchusersList = await get(
          this.apiUrls.getusersList + "/" + data
        );
        this.customer = fetchusersList.data.data;
        this.$LIPS(false);
      } catch (err) {
        this.$LIPS(false);

        this.$displayErrorMessage(err);
        return this.$router.push({
          name: "admin"
        });
      }
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    async postFeedbackComment(user) {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.closeFeedbackPopup();
            this.$LIPS(true);
            this.error = {};
            post(this.apiUrls.postComment, {
              notes: user.notes,
              reason_id: user.reason,
              customer_id: this.customer.id,
              user_id: localStorage.getItem("user_id")
            })
              .then(result => {
                this.$LIPS(false);
                this.$swal({
                  icon: "success",
                  title: "Feedback Logged Successfully"
                });
                // this.searchUsersList();
                this.customer.feedback.unshift(result.data.data);
              })

              .catch(({ response: { data } }) => {
                const errData = data.data.errors;
                this.error = errData ? errData : data;

                this.$LIPS(false);
              });
          }
        })
        .catch(e => {});
    },
    async postTodoComment(user) {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.closeTodoPopup();
            this.$LIPS(true);
            this.error = {};
            post(this.apiUrls.postTodo, {
              todo: user.todo,
              due_date: user.due_date,
              type: user.type,
              // status: user.status,
              customer_id: this.customer.id,
              user_id: localStorage.getItem("user_id")
            })
              .then(() => {
                this.$LIPS(false);
                this.$swal({
                  icon: "success",
                  title: "Todo Logged Successfully"
                });
                // this.customer.notifications.push({
                //   data: { date: new Date().toJSON(), feedback: user.feedback },
                // });
                user.todo = "";
                user.due_date = "";
                user.type = "";
                // user.status = "";
                this.getTodos();
              })

              .catch(({ response: { data } }) => {
                const errData = data.data.errors;
                this.error = errData ? errData : data;

                this.$LIPS(false);
              });
          }
        })
        .catch(e => {});
    },
    customFormatter(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    openModal(data) {
      this.comments = data.feedback;
      this.customer = data;
      data.feedback.length === 0 ? "" : (this.feedbackModal = true);
    },
    closeModal() {
      this.feedbackModal = false;
    },
    openPopup(data) {
      this.message = data;
      this.feedbackPopup = true;
    },
    logFeedbackPopup() {
      this.logFeedbackPopupValue = true;
    },

    closeFeedbackPopup() {
      this.logFeedbackPopupValue = false;
    },
    logTodoPopup() {
      this.logTodoPopupValue = true;
    },
    closeTodoPopup() {
      this.logTodoPopupValue = false;
    },
    closePopup() {
      this.feedbackPopup = false;
    },
    viewUser(data) {
      this.$router.push({
        name: "userProfile",
        params: {
          customer: data
        }
      });
    },
    toggleTabs: function(tabNumber) {
      this.openTab = tabNumber;
    },
    toggleBigTabs: function(tabNumber) {
      this.openBigTab = tabNumber;
    }
  }
};
</script>

<style>
.chatBox {
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.05);
  border-radius: 0px 10px 10px 10px;
  padding: 15px 10px;
  margin-bottom: 15px;
  width: 100%;
}
.space0 {
  height: 45px;
  /* background: #00e396; */
}
.overflowTest {
  overflow: scroll;
}
</style>
