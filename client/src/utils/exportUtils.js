export const exportAsText = (specification) => {
  const { featureIdea, tasks, groups, risks, unknowns } = specification;

  let text = `FEATURE SPECIFICATION\n`;
  text += `Generated: ${new Date(specification.generatedAt).toLocaleString()}\n`;
  text += `\n${'='.repeat(60)}\n\n`;

  text += `FEATURE IDEA\n`;
  text += `${'-'.repeat(60)}\n`;
  text += `Goal: ${featureIdea.goal}\n`;
  text += `Users: ${featureIdea.users}\n`;
  text += `Constraints: ${featureIdea.constraints}\n`;
  text += `Template: ${featureIdea.template}\n\n`;

  // User Stories
  const userStories = tasks.filter((t) => t.type === 'user_story');
  if (userStories.length > 0) {
    text += `USER STORIES (${userStories.length})\n`;
    text += `${'-'.repeat(60)}\n`;
    userStories.forEach((story, index) => {
      text += `${index + 1}. ${story.title} [${story.priority.toUpperCase()}]\n`;
      text += `   ${story.description}\n\n`;
    });
  }

  // Engineering Tasks
  const engineeringTasks = tasks.filter((t) => t.type === 'engineering_task');
  if (engineeringTasks.length > 0) {
    text += `ENGINEERING TASKS (${engineeringTasks.length})\n`;
    text += `${'-'.repeat(60)}\n`;
    engineeringTasks.forEach((task, index) => {
      text += `${index + 1}. ${task.title} [${task.priority.toUpperCase()}]\n`;
      text += `   ${task.description}\n\n`;
    });
  }

  // Groups
  if (groups && groups.length > 0) {
    text += `TASK GROUPS\n`;
    text += `${'-'.repeat(60)}\n`;
    groups.forEach((group) => {
      const groupTasks = tasks.filter((t) => t.groupId === group.id);
      text += `\n${group.name} (${groupTasks.length} tasks)\n`;
      groupTasks.forEach((task, index) => {
        text += `  ${index + 1}. ${task.title}\n`;
      });
    });
    text += `\n`;
  }

  // Risks
  if (risks) {
    text += `RISKS\n`;
    text += `${'-'.repeat(60)}\n`;
    text += `${risks}\n\n`;
  }

  // Unknowns
  if (unknowns) {
    text += `UNKNOWNS\n`;
    text += `${'-'.repeat(60)}\n`;
    text += `${unknowns}\n\n`;
  }

  return text;
};

export const exportAsMarkdown = (specification) => {
  const { featureIdea, tasks, groups, risks, unknowns } = specification;

  let md = `# Feature Specification\n\n`;
  md += `**Generated:** ${new Date(specification.generatedAt).toLocaleString()}\n\n`;
  md += `---\n\n`;

  md += `## Feature Idea\n\n`;
  md += `- **Goal:** ${featureIdea.goal}\n`;
  md += `- **Users:** ${featureIdea.users}\n`;
  md += `- **Constraints:** ${featureIdea.constraints}\n`;
  md += `- **Template:** ${featureIdea.template}\n\n`;

  // User Stories
  const userStories = tasks.filter((t) => t.type === 'user_story');
  if (userStories.length > 0) {
    md += `## User Stories (${userStories.length})\n\n`;
    userStories.forEach((story, index) => {
      md += `### ${index + 1}. ${story.title}\n\n`;
      md += `**Priority:** ${story.priority.toUpperCase()}\n\n`;
      md += `${story.description}\n\n`;
    });
  }

  // Engineering Tasks
  const engineeringTasks = tasks.filter((t) => t.type === 'engineering_task');
  if (engineeringTasks.length > 0) {
    md += `## Engineering Tasks (${engineeringTasks.length})\n\n`;
    engineeringTasks.forEach((task, index) => {
      md += `### ${index + 1}. ${task.title}\n\n`;
      md += `**Priority:** ${task.priority.toUpperCase()}\n\n`;
      md += `${task.description}\n\n`;
    });
  }

  // Groups
  if (groups && groups.length > 0) {
    md += `## Task Groups\n\n`;
    groups.forEach((group) => {
      const groupTasks = tasks.filter((t) => t.groupId === group.id);
      md += `### ${group.name} (${groupTasks.length} tasks)\n\n`;
      groupTasks.forEach((task, index) => {
        md += `${index + 1}. ${task.title}\n`;
      });
      md += `\n`;
    });
  }

  // Risks
  if (risks) {
    md += `## Risks\n\n`;
    md += `${risks}\n\n`;
  }

  // Unknowns
  if (unknowns) {
    md += `## Unknowns\n\n`;
    md += `${unknowns}\n\n`;
  }

  return md;
};

export const downloadFile = (content, filename, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};