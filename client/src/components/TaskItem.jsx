import React, { useState } from "react";
import { GripVertical, Edit2, Trash2, Save, X } from "lucide-react";

const TaskItem = ({ task, onUpdate, onDelete, provided, snapshot }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-red-600";
      case "medium":
        return "from-amber-500 to-orange-600";
      case "low":
        return "from-green-500 to-emerald-600";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={`glass rounded-xl p-4 mb-3 transition-all duration-200 ${
        snapshot.isDragging
          ? "shadow-2xl scale-105 rotate-2 ring-2 ring-primary-400"
          : "hover:shadow-lg"
      } ${task.type === "user_story" ? "border-l-4 border-purple-500" : "border-l-4 border-cyan-500"}`}
    >
      <div className="flex items-start space-x-3">
        {/* Drag Handle */}
        <div
          {...provided.dragHandleProps}
          className="pt-1 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-colors"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3 animate-scale-in">
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                placeholder="Task title"
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                placeholder="Task description"
                rows="3"
              />
              <div className="flex items-center justify-between">
                <select
                  value={editedTask.priority}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, priority: e.target.value })
                  }
                  className="px-3 py-2 rounded-lg border-2 border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-800 flex-1">
                  {task.title}
                </h4>
                <span
                  className={`ml-2 px-2 py-1 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${getPriorityColor(
                    task.priority,
                  )} shadow-sm`}
                >
                  {task.priority}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {task.description}
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                    task.type === "user_story"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-cyan-100 text-cyan-700"
                  }`}
                >
                  {task.type === "user_story"
                    ? "📖 User Story"
                    : "⚙️ Engineering Task"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-primary-100 text-primary-600 transition-colors"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
