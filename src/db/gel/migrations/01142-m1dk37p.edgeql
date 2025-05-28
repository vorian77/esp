CREATE MIGRATION m1dk37pmrkxj672tc4mqcg3gbyrnrce66t4dxrsexemsuel3tnlf6q
    ONTO m1jidwelcldutadgcosjr3gxeb4ih5df5me55xe4tvjt3sbsrizsna
{
  ALTER TYPE sys_core::SysObjAttr {
      ALTER LINK codeAttrType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
