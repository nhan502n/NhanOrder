namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $url;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->url = route('verify.email', ['token' => $user->verify_token]); // URL xác minh email
    }

    public function build()
    {
        return $this->subject('Xác minh email của bạn')
                    ->view('emails.verify') // Đảm bảo view này tồn tại
                    ->with([
                        'url' => $this->url,
                    ]);
    }
}
