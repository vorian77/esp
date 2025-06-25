CREATE MIGRATION m17ukosnmetnpqeo6yawbxle5j2rstezwgwxfdgvecuf4xafnffiea
    ONTO m1kdxuythr55jqa5uz54keqgjdsleqpgf3vd6km4aqajwn5ts4wk5q
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeComponent {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
