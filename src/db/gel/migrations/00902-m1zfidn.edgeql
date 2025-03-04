CREATE MIGRATION m1zfidngckjskurq6nhbxxmg7woxsdr4z5ogqbc5wlh4apr6i4nyva
    ONTO m1dlmd5pf76anzgpwiyrt5t7tqe7po7vvnyxuy6tobisnukr7hck5a
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY exprPresetListEdit;
  };
};
