// "use client";

// import { useState } from "react";
// import type { Todo } from "@/app/generated/prisma/client";

// import { Button } from "@/components/ui/button";
// import { Trash2, CheckCircle, XCircle } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// interface TodoItemProps {
//   todo: Todo;
//   isAdmin?: boolean;
//   onUpdate: (id: string, completed: boolean) => void;
//   onDelete: (id: string) => void;
// }

// export function TodoItem({
//   todo,
//   isAdmin = false,
//   onUpdate,
//   onDelete,
// }: TodoItemProps) {
//   const [isCompleted, setIsCompleted] = useState(todo.completed);

//   const toggleComplete = async () => {
//     const newCompletedState = !isCompleted;
//     setIsCompleted(newCompletedState);
//     onUpdate(todo.id, newCompletedState);
//   };

//   return (
//     <Card>
//       <CardContent className="flex items-center justify-between p-4">
//         <span className={isCompleted ? "line-through" : ""}>{todo.title}</span>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" size="sm" onClick={toggleComplete}>
//             {isCompleted ? (
//               <XCircle className="mr-2 h-4 w-4" />
//             ) : (
//               <CheckCircle className="mr-2 h-4 w-4" />
//             )}
//             {isCompleted ? "Undo" : "Complete"}
//           </Button>
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={() => onDelete(todo.id)}
//           >
//             <Trash2 className="mr-2 h-4 w-4" />
//             Delete
//           </Button>
//           {isAdmin && (
//             <span className="ml-2 text-sm text-muted-foreground">
//               User ID: {todo.userId}
//             </span>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import { useState } from "react";
// import type { Todo } from "@/app/generated/prisma/client";
// import { Button } from "@/components/ui/button";
// import { Trash2, CheckCircle, XCircle } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// interface TodoItemProps {
//   todo: Todo;
//   isAdmin?: boolean;
//   onUpdate: (id: string, completed: boolean) => void;
//   onDelete: (id: string) => void;
// }

// export function TodoItem({
//   todo,
//   isAdmin = false,
//   onUpdate,
//   onDelete,
// }: TodoItemProps) {
//   const [isCompleted, setIsCompleted] = useState(todo.completed);

//   const toggleComplete = async () => {
//     const next = !isCompleted;
//     setIsCompleted(next);
//     onUpdate(todo.id, next);
//   };

//   return (
//     <Card className="border-white/10 bg-background/60 backdrop-blur">
//       <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-start gap-3">
//           <div
//             className={[
//               "mt-1 h-2.5 w-2.5 rounded-full",
//               isCompleted
//                 ? "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.55)]"
//                 : "bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,.45)]",
//             ].join(" ")}
//           />
//           <div>
//             <p
//               className={
//                 isCompleted
//                   ? "line-through text-muted-foreground"
//                   : "text-foreground"
//               }
//             >
//               {todo.title}
//             </p>
//             {isAdmin && (
//               <p className="mt-1 text-xs text-muted-foreground">
//                 User ID: {todo.userId}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={toggleComplete}
//             className="gap-2"
//           >
//             {isCompleted ? (
//               <XCircle className="h-4 w-4" />
//             ) : (
//               <CheckCircle className="h-4 w-4" />
//             )}
//             {isCompleted ? "Undo" : "Complete"}
//           </Button>

//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={() => onDelete(todo.id)}
//             className="gap-2"
//           >
//             <Trash2 className="h-4 w-4" />
//             Delete
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import type { Todo } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TodoItemProps {
  todo: Todo;
  isAdmin?: boolean;
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  isAdmin = false,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const toggleComplete = async () => {
    const next = !isCompleted;
    setIsCompleted(next);
    onUpdate(todo.id, next);
  };

  return (
    <Card className="border-white/10 bg-background/60 backdrop-blur">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={[
              "mt-1 h-2.5 w-2.5 rounded-full",
              isCompleted
                ? "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.55)]"
                : "bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,.45)]",
            ].join(" ")}
          />
          <div className="min-w-0">
            <p
              className={[
                "break-words",
                isCompleted
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              ].join(" ")}
            >
              {todo.title}
            </p>

            {isAdmin && (
              <p className="mt-1 text-xs text-muted-foreground break-all">
                User ID: {todo.userId}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleComplete}
            className="gap-2"
          >
            {isCompleted ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            {isCompleted ? "Undo" : "Complete"}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
