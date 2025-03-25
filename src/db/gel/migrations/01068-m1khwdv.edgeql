CREATE MIGRATION m1khwdvo4c7drr5cnb6dcl7jh4qchtfwo5psrldg4lmkiqpbb6rlia
    ONTO m13ftavfpdenatwg5wxp2illuvqxk5nzunali74si4hnvuqcp2hsoa
{
  ALTER TYPE sys_core::SysAttr {
      CREATE LINK codeAttrType: sys_core::SysCode;
  };
};
