<script setup>
    
</script>
<template>
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Create New Task</h2>
    
        <form>
          <!-- Task Name -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="task-name">
              Task Name
            </label>
            <input id="task-name" type="text" placeholder="Enter task name" 
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
    
          <!-- Task Description -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="task-desc">
              Description
            </label>
            <textarea id="task-desc" placeholder="Enter task description" 
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
    
          <!-- Due Date -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="due-date">
              Due Date
            </label>
            <input id="due-date" type="date" 
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
    
          <!-- Due Time -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="due-time">
              Due Time
            </label>
            <input id="due-time" type="time" 
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
    
          <!-- Priority -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="priority">
              Priority
            </label>
            <select id="priority" 
                    class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
    
          <!-- Labels -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="labels">
              Labels
            </label>
            <input id="labels" type="text" placeholder="Enter labels, separated by commas" 
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
    
          <!-- Submit Button -->
          <div class="flex items-center justify-between">
            <button type="submit" 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Task
            </button>
          </div>
        </form>
      </div>
</template>



