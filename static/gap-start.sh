#!/data/data/com.termux/files/usr/bin/sh
# gap-start: starts GAP's service on this phone over Wireless debugging, from
# Termux, with no computer. The guide: https://tsumtsum.gapscripts.app/guides/start-from-the-phone
# Needs `pkg install android-tools` and one pairing first:
#   adb pair localhost:<pairing port>
# Then after every phone restart: turn on Wireless debugging, run gap-start.

# The service's class, split so that pkill below cannot match this script's own
# command line (the whole remote script is one `sh -c` argument on the phone).
M=com.generalautomation.platform.Ma

connected() {
  adb devices | awk 'NR > 1 && $2 == "device" { print $1; exit }'
}

adb start-server >/dev/null 2>&1
DEV=$(connected)

if [ -z "$DEV" ]; then
  echo "Looking for Wireless debugging..."
  PORT=""
  for i in 1 2 3 4 5; do
    PORT=$(adb mdns services 2>/dev/null \
      | awk '/_adb-tls-connect/ { n = split($NF, a, ":"); print a[n]; exit }')
    [ -n "$PORT" ] && break
    sleep 1
  done
  if [ -z "$PORT" ]; then
    echo "Couldn't find it by itself."
    echo "Open Settings > Developer options, tap the words 'Wireless debugging',"
    printf "and type the number after the colon in 'IP address & Port': "
    read -r PORT
  fi
  adb connect "localhost:$PORT"
  sleep 1
  DEV=$(connected)
fi

if [ -z "$DEV" ]; then
  echo
  echo "Not connected. Check that Wireless debugging is on and that this phone"
  echo "has been paired once (adb pair localhost:<pairing port>)."
  exit 1
fi

echo "Starting GAP's service..."
adb -s "$DEV" shell "M=$M"'
A=$(pm path com.generalautomation.platform | head -1 | cut -d: -f2)
if [ -z "$A" ]; then echo "GAP is not installed."; exit 1; fi
D=/data/local/tmp/gap
pkill -f "${M}i[n]"
sleep 1
mkdir -p $D/lib && cp -f $A $D/gap.apk && cp -f ${A%/*}/lib/*/*.so $D/lib/ \
  && chmod -R 755 $D || { echo "Could not copy GAP into place."; exit 1; }
CLASSPATH=$D/gap.apk LD_LIBRARY_PATH=$D/lib \
  nohup app_process /system/bin "${M}in" > $D/service.log 2>&1 &
sleep 4
if grep -q "\[gap\] ready" $D/service.log; then
  echo "The GAP service is running. Open GAP."
else
  echo "The service did not start. Send this to the GAP team:"
  cat $D/service.log
  exit 1
fi'
