import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Edit2, Trash2, Save, X, FolderOpen } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskGroup = ({ group, tasks, onUpdateGroup, onDeleteGroup, onUpdateTask, onDeleteTask }) => {
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
    <div className="task-group" style={{ borderLeftColor: group.color }}>
      <div className="task-group-header">
        {isEditing ? (
          <div className="group-edit-form">
            <input
              type="text"
              value={editedGroup.name}
              onChange={(e) =>
                setEditedGroup({ ...editedGroup, name: e.target.value })
              }
              className="group-edit-name"
              placeholder="Group name"
            />
            <input
              type="color"
              value={editedGroup.color}
              onChange={(e) =>
                setEditedGroup({ ...editedGroup, color: e.target.value })
              }
              className="group-edit-color"
            />
            <div className="group-edit-buttons">
              <button onClick={handleSave} className="btn-icon btn-success">
                <Save size={16} />
              </button>
              <button onClick={handleCancel} className="btn-icon btn-secondary">
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="group-info">
              <FolderOpen size={20} style={{ color: group.color }} />
              <h3 className="group-name">{group.name}</h3>
              <span className="group-count">{groupTasks.length} tasks</span>
            </div>
            <div className="group-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-icon"
                title="Edit group"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDeleteGroup(group.id)}
                className="btn-icon btn-danger"
                title="Delete group"
              >
                <Trash2 size={16} />
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
            className={`task-group-content ${
              snapshot.isDraggingOver ? 'drag-over' : ''
            }`}
          >
            {groupTasks.length === 0 ? (
              <div className="empty-group">
                <p>Drag tasks here to add to this group</p>
              </div>
            ) : (
              groupTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                  provided={provided}
                  isDragging={snapshot.isDraggingOver}
                />
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