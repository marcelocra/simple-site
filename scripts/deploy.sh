#!/usr/bin/env bash

(cd public \
  && deployctl deploy \
     --project=simple-site \
     https://deno.land/std@0.220.0/http/file_server.ts)
