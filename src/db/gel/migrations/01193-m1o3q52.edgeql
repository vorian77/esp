CREATE MIGRATION m1o3q52ibxesrmv5d2hrlo3mvwvqrzt4kajvtk4tvdzxh3wiwx4swa
    ONTO m1ujr4j4hc3rqsy6ytujlklcin3iog53qhtow5sssmb5vbsisdokwa
{
  ALTER TYPE sys_user::SysUserActionShow {
      CREATE LINK codeExprAccessType: sys_core::SysCode;
  };
  ALTER TYPE sys_user::SysUserActionShow {
      ALTER PROPERTY exprField {
          RENAME TO exprKey;
      };
  };
  ALTER TYPE sys_user::SysUserActionShow {
      CREATE PROPERTY exprParm: std::str;
  };
};
