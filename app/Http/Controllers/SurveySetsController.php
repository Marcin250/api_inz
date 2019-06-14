<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\SurveySets;
use App\Http\Resources\SurveySets as SurveySetsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserSurveyAnswersController;
use Facades\App\CacheData\SurveysCache;
use App\Surveys;

class SurveySetsController extends Controller
{
    public static function buildSurveySetData(&$survey)
    {
        $survey = DB::table('survey_sets')->select('Answer as answer', 'idSurveySet as id_survey_set')->where('idSurvey', $survey)->get();
    }

    public static function getAnswers(&$survey, $surveyID)
    {
        $surveyAnswers = DB::table('survey_sets')->leftJoin('user_survey_answers', 'user_survey_answers.idSurveySet', '=', 'survey_sets.idSurveySet')->select('survey_sets.idSurveySet as idsurveyset', 'survey_sets.Answer as answer', DB::raw('count(user_survey_answers.idSurveySet) as users_anwsers_count'))->groupBy('survey_sets.idSurveySet', 'survey_sets.Answer', 'user_survey_answers.idSurveySet')->where('survey_sets.idSurvey', $surveyID)->get();
        foreach ($surveyAnswers as $key => $surveyAnswer) {
            array_push($survey, array('idsurveyset' => $surveyAnswer->idsurveyset, 'answer' => $surveyAnswer->answer, 'answers_count' => $surveyAnswer->users_anwsers_count));
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /*$surveys = DB::table('surveys')->select( 'idSurvey as idsurvey', 'Topic as topic')->get();
        foreach ($surveys as $key => $survey) {
            $survey->answers = array();
            $this->getAnswers($survey->answers, $survey->idsurvey);
        }
        return response()->json($surveys);*/
    }

    public function get_survey_set($id)
    {
        $survey_set = DB::table('surveys')->select('idSurvey as idsurvey', 'Topic as topic')->where('idSurvey', $id)->first();
        $survey_set->answers = array();
        $this->getAnswers($survey_set->answers, $survey_set->idsurvey);
        return response()->json($survey_set);
    }

    public function get_latest()
    {
        if(isset($_SESSION['iduser']))
                $user = $_SESSION['iduser'];
            else
                $user = 'none';
        $latestSurvey = SurveysCache::latest();
        $voted = SurveysCache::latestUser($user);
        $latestSurvey->voted = $voted;
        return response()->json($latestSurvey);
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if(isset($data['answers']) && isset($data['topic']))
        {
            $surveys = new Surveys;
            $surveys->Topic = $data['topic'];
            if(Surveys::where('Topic', '=' , $request->topic)->exists())
                return response()->json(['status' => false, 'error' => 'wrong data']);
            else 
            {
                if($surveys->save())
                {
                    $answersArray = [];
                    foreach ($data['answers'] as $key => $answer) {
                        $answersArray[] = ['Answer' => $answer, 'idSurvey' => $surveys->id];
                    }
                    if(SurveySets::insert($answersArray))
                    {
                        return response()->json(['status' => true, 'error' => '']);
                    }
                    else
                        return response()->json(['status' => false, 'error' => 'wrong data']);
                }
            }
        }
        else
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /*
            Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="PUT">
        */
        $data = json_decode($request->getContent(), true);
        $msg = '';
        $survey = SurveysCache::get_survey($id);
        //print_r($survey->answers);
        //print_r($data['answers']);
        //return;
        if(isset($data['topic']))
        {
            if($data['topic'] !== $survey->topic)
            {
                Surveys::where('idSurvey', $id)->update(['Topic' => $data['topic']]);
                $msg .= 'topic changed';
            }
        }
        if(isset($data['answers']))
        {
            if(!empty($data['answers']))
            {
                foreach ($survey->answers as $key => $answer) {
                    if(isset($data['answers'][$answer['idsurveyset']]))
                    {
                        if($data['answers'][$answer['idsurveyset']] !== $answer['answer'])
                        {
                            SurveySets::where('idSurveySet', $answer['idsurveyset'])->update(['Answer' => $data['answers'][$answer['idsurveyset']]]);
                        }
                    }
                }
                $msg .= empty($msg) ? 'answers changed' : ' answers changed';
            }
        }
        SurveysCache::forgetKey('get_survey.' . $id);
        return response()->json(['status' => true, 'error' => $msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /*
            Aby wysłać dane (usunięcie) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="DELETE">
        */
        if(SurveySets::where('idSurveySet', '=' , $id)->delete()) 
            return response()->json(['status' => true, 'error' => '']);
        else 
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }
}
