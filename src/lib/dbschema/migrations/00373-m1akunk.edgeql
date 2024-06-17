CREATE MIGRATION m1akunkvrnu3qrlolrr5wkurqgczmqt7xl4qamw27swf7fuuebjgsa
    ONTO m1rcbpphcz3r6epjwtjlyfujbglv7zvjehwvqliuc3ziwc2qwxmxna
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customCodeType {
          RENAME TO customColCodeType;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customActionMethod {
          RENAME TO customColActionMethod;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customActionType {
          RENAME TO customColActionType;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customActionValue {
          RENAME TO customColActionValue;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customAlign {
          RENAME TO customColAlign;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customCourceKey {
          RENAME TO customColLabel;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customLabel {
          RENAME TO customColPrefix;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customPrefix {
          RENAME TO customColSize;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customSize {
          RENAME TO customColSource;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY customSource {
          RENAME TO customSourceKey;
      };
  };
};
