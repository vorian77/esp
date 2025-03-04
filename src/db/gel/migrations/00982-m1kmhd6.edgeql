CREATE MIGRATION m1kmhd6bki4b3hlzrdxvjnzqxlwzgruhwalan36wwqmqa67uln7stq
    ONTO m1ici6nf5uxlj5n3ycm4j6o4aarditic2qe442gsvvg55vraz5dkla
{
  ALTER TYPE sys_core::SysMsg {
      CREATE LINK responses := (.<parent[IS sys_core::SysMsg]);
  };
};
