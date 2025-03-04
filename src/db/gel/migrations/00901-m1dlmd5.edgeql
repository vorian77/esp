CREATE MIGRATION m1dlmd5pf76anzgpwiyrt5t7tqe7po7vvnyxuy6tobisnukr7hck5a
    ONTO m1my25zjsuzccfmeb4kwi4p64ajkndeljzwz4fwmu2band76sirgqq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY exprPresetListEdit: std::str;
  };
};
