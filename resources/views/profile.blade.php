@extends('layouts.app')

@section('content')
<profile displayname="{{ $user->display_name }}" avatar="{{ $user->avatar }}"></profile>
<section class="section">
  <div class="container is-fluid">
  </div>
</section>
@endsection
