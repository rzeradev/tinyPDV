<?php

namespace App\Http\Resources;

// use App\Utilities\MediasUtilities;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            // 'subscription_type'=>$this->typeSubscription->type,
            'email' => $this->email,
            // 'image_user_profile_url' => $this->when($this->profile->hasMedia(MediasUtilities::USER_PROFILE), $this->profile->getFirstMediaUrl(MediasUtilities::USER_PROFILE),null),
        ];
    }
}
