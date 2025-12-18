export type UserListDto = {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  createdAt: string;
  roles: string[];
};

export type PermissionDto = {
  id: string;
  name: string;
  displayName: string;
  category: string;
  description?: string | null;
};

export type PermissionsByCategoryDto = {
  category: string;
  permissions: PermissionDto[];
};

export type RoleDto = {
  id: string;
  name: string;
  description?: string | null;
  isSystemRole: boolean;
  createdAt: string;
  permissions: PermissionDto[];
};

export type DocumentListDto = {
  id: string;
  title: string;
  description?: string | null;
  fileName: string;
  isActive: boolean;
  createdAt: string;
  assignedRoles: string[];
};

export type ProblemListDto = {
  id: string;
  title: string;
  priority: string;
  status: string;
  dueDate?: string | null;
  assignmentCount: number;
  createdAt: string;
  createdByUserName: string;
};

export type MyAssignmentDto = {
  assignmentId: string;
  problemId: string;
  problemTitle: string;
  problemDescription?: string | null;
  problemPriority: string;
  status: string;
  assignedAt: string;
  dueDate?: string | null;
  assignedByUserName: string;
};

export type UserScoreDto = {
  userId: string;
  userName: string;
  email: string;
  quizPoints: number;
  taskPoints: number;
  totalPoints: number;
  quizzesCompleted: number;
  tasksCompleted: number;
  level: number;
  rank: number;
};

export type LeaderboardDto = {
  rankings: UserScoreDto[];
  currentUserRanking?: UserScoreDto | null;
};

export type QuestionWithAnswerDto = {
  id: string;
  documentId: string;
  documentTitle: string;
  questionText: string;
  options: string[];
  difficulty: string;
  points: number;
  correctAnswerIndex: number;
};

