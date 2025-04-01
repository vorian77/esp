CREATE MIGRATION m14gd43fcufywo7jyq7zmsc7xal7ecmyfi2led4grqkhd2wlaaaihq
    ONTO m14b4isvw2mgbjydg2obsj56jyik6pxhaj7knlwpo7nlemciwrxqma
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK children {
          RENAME TO childrenOld;
      };
  };
};
