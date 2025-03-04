CREATE MIGRATION m1fysneorcu2nh552m7w2wkgjszffptkrht6oq6siupbdndbyoiknq
    ONTO m1kmhd6bki4b3hlzrdxvjnzqxlwzgruhwalan36wwqmqa67uln7stq
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE MULTI LINK children: sys_core::SysNodeObj {
          ON SOURCE DELETE ALLOW;
      };
  };
};
