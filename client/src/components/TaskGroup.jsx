import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Edit2, Trash2, Save, X, FolderOpen } from "lucide-react";
import TaskItem from "./TaskItem";

const TaskGroup = ({
  group,
  tasks,
  onUpdateGroup,
  onDeleteGroup,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGroup, setEditedGroup] = useState(group);

  const handleSave = () => {
    onUpdateGroup(editedGroup);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGroup(group);
    setIsEditing(false);
  };

  const groupTasks = tasks.filter((task) => task.groupId === group.id);

  return (
    <div
      className="glass rounded-2xl p-6 mb-6 border-l-4 animate-slide-up card-hover"
      style={{ borderLeftColor: group.color }}
    >
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
        {isEditing ? (
          <div className="flex items-center space-x-3 flex-1 animate-scale-in">
            <input
              type="text"
              value={editedGroup.name}
              onChange={(e) =>
                setEditedGroup({ ...editedGroup, name: e.target.value })
              }
              className="flex-1 px-3 py-2 rounded-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="Group name"
            />
            <input
              type="color"
              value={editedGroup.color}
              onChange={(e) =>
                setEditedGroup({ ...editedGroup, color: e.target.value })
              }
              className="w-12 h-10 rounded-lg border-2 border-slate-300 cursor-pointer"
            />
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
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-lg shadow-lg"
                style={{ backgroundColor: group.color }}
              >
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {group.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {groupTasks.length} tasks
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg hover:bg-primary-100 text-primary-600 transition-colors"
                title="Edit group"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteGroup(group.id)}
                className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                title="Delete group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <Droppable droppableId={group.id} type="TASK">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[100px] rounded-xl p-3 transition-all duration-200 ${
              snapshot.isDraggingOver
                ? "bg-primary-50 ring-2 ring-primary-300"
                : "bg-slate-50/50"
            }`}
          >
            {groupTasks.length === 0 ? (
              <div className="text-center py-12 px-4 border-2 border-dashed border-slate-300 rounded-xl">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">
                  Drag tasks here to add to this group
                </p>
              </div>
            ) : (
              groupTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <TaskItem
                      task={task}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskGroup;
