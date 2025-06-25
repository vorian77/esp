CREATE MIGRATION m17445kgj2s3zfcwu2jbxsfyfjmtpjhsl22gnghl6khwq4cysle4uq
    ONTO m16qircuazsbcchjckgjdyogy4jivvkh4a5po7fibhu5rhsmmmmkca
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customColNodeComponent {
          RENAME TO customColCodeComponent;
      };
  };
};
