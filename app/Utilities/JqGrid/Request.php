<?php namespace App\Utilities\JqGrid;

class Request {
    protected static $QUERY_REQ_PARAM = '_query';
    protected static $ROWS_PER_PAGE = 'rows';

    public function __construct(\Illuminate\Http\Request $request){
       $this->originalRequest = $request;
    }

    public function hasRowsPerPage() {
        return $this->originalRequest->has(self::$ROWS_PER_PAGE);
    }

    public function getQueryParam() {
        if (! $this->originalRequest->has(self::$QUERY_REQ_PARAM)){
            throw new \Exception('request param does not exists');
        }

        $param = $this->originalRequest->get(self::$QUERY_REQ_PARAM);
        return $param;
    }

    public function getOrNewQueryParam() {
        if (! $this->originalRequest->has(self::$QUERY_REQ_PARAM)){
           return [];
        }

        $param = $this->originalRequest->get(self::$QUERY_REQ_PARAM);
        return $param;
    }

    public function getRowsPerPage() {
        if (! $this->hasRowsPerPage()) {
            throw new \Exception('request param does not exists');
        }

        return $this->originalRequest->get(self::$ROWS_PER_PAGE);
    }
}